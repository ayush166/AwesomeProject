// import "core-js/stable/atob";
// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import { AuthProvider } from '@descope/react-native-sdk';
// import { NavigationContainer } from '@react-navigation/native';
// import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from "expo-auth-session";
// import { StyleSheet, Text, View } from "react-native";
// WebBrowser.maybeCompleteAuthSession();

// const descopeProjectId = "P2c9jvFTJ9lTpaGr0oAZzEqCLoBz";
// const descopeUrl = `https://api.descope.com/${descopeProjectId}`;
// const redirectUri = AuthSession.makeRedirectUri();
// import{ jwtDecode }from "jwt-decode";
// import { Button } from "react-native-elements";


// export default function App() {
//   const [authTokens, setAuthTokens] = React.useState(null);
//   const [userInfo, setUserInfo] = React.useState(null);
//   const discovery = AuthSession.useAutoDiscovery(descopeUrl);

//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: descopeProjectId,
//       responseType: AuthSession.ResponseType.Code,
//       redirectUri,
//       usePKCE: true,
//       scopes: ["openid", "profile", "email"],
//     },
//     discovery
//   );

//   React.useEffect(() => {
//     const exchangeFn = async (exchangeTokenReq) => {
//       try {
//         const exchangeTokenResponse = await AuthSession.exchangeCodeAsync(
//           exchangeTokenReq,
//           discovery
//         );
//         setAuthTokens(exchangeTokenResponse);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     if (response) {
//       if (response.error) {
//         Alert.alert(
//           "Authentication error",
//           response.params.error_description || "something went wrong"
//         );
//         return;
//       }
//       if (response.type === "success") {
//         exchangeFn({
//           clientId: descopeProjectId,
//           code: response.params.code,
//           redirectUri,
//           extraParams: {
//             code_verifier: request.codeVerifier,
//           },
//         });
//       }
//     }
//   }, [discovery, request, response]);

//   React.useEffect(() => {
//     if (authTokens && authTokens.accessToken) {
//       try {
//         const decodedToken = jwtDecode(authTokens.idToken);
//         console.log("Decoded Token: ", decodedToken);
//         setUserInfo(decodedToken);
//       } catch (error) {
//         console.error("Error decoding the JWT: ", error);
//       }
//     }
//   }, [authTokens]);

//   const logout = async () => {
//     const revokeResponse = await AuthSession.revokeAsync(
//       {
//         clientId: descopeProjectId,
//         token: authTokens.refreshToken,
//       },
//       discovery
//     );
//     if (revokeResponse) {
//       setAuthTokens(null);
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       {authTokens ? (
//         <>
//          <Text style={styles.title}>
//   Welcome, {userInfo ? userInfo.email || userInfo.name : "User"}!
// </Text>
//           <Button title="Logout" onPress={() => logout()} color="#841584" />
//         </>
//       ) : (
//         <>
//           <Text style={styles.title}>Descope + Expo Sample App</Text>
//           <Button
//             disabled={!request}
//             title="Login"
//             onPress={() => promptAsync()}
//             color="#841584"
//           />
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: "#333",
//   },
// });





// // // // // src/App.js
// // // import React from 'react';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import AppNavigator from './src/navigation/AppNavigator';
// // // import { AuthProvider } from './src/services/authService';

// // // export default function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <NavigationContainer>
// // //         <AppNavigator />
// // //       </NavigationContainer>
// // //     </AuthProvider>
// // //   );
// // // }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "@navigation/AppNavigator"
import { AuthProvider } from '@hooks/useAuth';


export default function App() {
  return (
    <AuthProvider >
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

// import { useCallback } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import { AuthProvider, useFlow, useDescope, useSession } from '@descope/react-native-sdk'

// export default function App() {
  
//   const flow = useFlow()
//   const { session, clearSession, manageSession } = useSession()
//   const { logout } = useDescope()

//   const handleLogout = useCallback(() => {
//     logout()
//   }, [logout])

//   const startFlow = async () => {
//     try {
//       const resp = await flow.start('https://auth.descope.io/login/P2c9jvFTJ9lTpaGr0oAZzEqCLoBz', '<URL_FOR_APP_LINK>')
//       await manageSession(resp.data)
//     } catch (e) {
//       // handle errors
//     }
//   }
  
//   const exampleFetch = async () => {
//     const res = await fetch('/path/to/server/api', {
//       headers: {
//         Authorization: `Bearer ${session.sessionJwt}`,
//       },
//     })
//   }

//   return (
//     <AuthProvider projectId="P2c9jvFTJ9lTpaGr0oAZzEqCLoBz">
//      {session ? (
//         <View style={styles.container}>
//           <Text>Welcome! {session.user.name}</Text>
//           <Button onPress={handleLogout} title="Logout" />
//         </View>
//      ) : (
//         <View style={styles.container}>
//           <Text>Welcome!</Text>
//           <Button onPress={startFlow} title="Start Flow" />
//         </View>
//      )}
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



