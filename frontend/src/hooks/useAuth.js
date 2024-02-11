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
    const discovery = AuthSession.useAutoDiscovery(descopeUrl);
   
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
      {
        clientId: descopeProjectId,
        responseType: AuthSession.ResponseType.Code,
        redirectUri,
        usePKCE: true,
        scopes: ["openid", "profile", "email"],
      },
      discovery
    );
  
    
  useEffect(() => {
    const exchangeFn = async () => {
      try {
        const exchangeTokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: descopeProjectId,
            code: response.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier,
            },
          },
          discovery
        );
        setAuthTokens(exchangeTokenResponse);
        const decodedToken = jwtDecode(exchangeTokenResponse.idToken);
        console.log("Decoded Token: ", decodedToken);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error(error);
      }
    };
    if (response?.type === "success") {
      exchangeFn();
    } else if (response?.error) {
      Alert.alert(
        "Authentication error",
        response.params.error_description || "something went wrong"
      );
    }
  }, [response]);
    
    
   
    const logout = async () => {
      const revokeResponse = await AuthSession.revokeAsync(
        {
          clientId: descopeProjectId,
          token: authTokens.refreshToken,
        },
        discovery
      );
      if (revokeResponse) {
        setAuthTokens(null);
      }
    };
    const signIn = useCallback(() => {
        if (!request) {
          console.error("Authentication request is not ready");
          return;
        }
        promptAsync({ useProxy: true }).catch(console.error);
      }, [promptAsync, request]);
    
  return { userInfo, signIn, logout, authTokens };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
