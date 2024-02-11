import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import * as AuthSession from 'expo-auth-session';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";

const AuthContext = createContext();
const descopeProjectId = "P2c9jvFTJ9lTpaGr0oAZzEqCLoBz";
const descopeUrl = `https://api.descope.com/${descopeProjectId}`;
const redirectUri = AuthSession.makeRedirectUri();

export const useAuth = () => {
  const [authTokens, setAuthTokens] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const discovery = AuthSession.useAutoDiscovery(descopeUrl);

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: descopeProjectId,
    responseType: AuthSession.ResponseType.Code,
    redirectUri,
    usePKCE: true,
    scopes: ["openid", "profile", "email"],
  }, discovery);

  useEffect(() => {
    if (response) {
      setIsLoading(true); // Set loading to true when a response is being processed
      const exchangeFn = async () => {
        try {
          const exchangeTokenResponse = await AuthSession.exchangeCodeAsync({
            clientId: descopeProjectId,
            code: response.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier,
            },
          }, discovery);
          setAuthTokens(exchangeTokenResponse);
          const decodedToken = jwtDecode(exchangeTokenResponse.idToken);
          console.log("Decoded Token: ", decodedToken);
          setUserInfo(decodedToken);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false); // Set loading to false after processing the response or catching an error
        }
      };
      if (response.type === "success") {
        exchangeFn();
      } else if (response.error) {
        Alert.alert(
          "Authentication error",
          response.params.error_description || "something went wrong"
        );
        setIsLoading(false); // Ensure loading is set to false on error
      }
    }
  }, [response]);

  const signIn = useCallback(() => {
    if (!request) {
      console.error("Authentication request is not ready");
      return;
    }
    setIsLoading(true); // Set loading to true when initiating sign-in
    promptAsync({ useProxy: true }).catch((error) => {
      console.error(error);
      setIsLoading(false); // Set loading to false if promptAsync fails
    });
  }, [promptAsync, request]);

  const logout = async () => {
    setIsLoading(true); // set loading to true when starting the logout process
    const revokeResponse = await AuthSession.revokeAsync({
      clientId: descopeProjectId,
      token: authTokens.refreshToken,
    }, discovery);
    if (revokeResponse) {
      setAuthTokens(null);
      setUserInfo(null);
    }
    setIsLoading(false); // Set loading to false after logout
  };

  return { userInfo, signIn, logout, authTokens, isLoading };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
