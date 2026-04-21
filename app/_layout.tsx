import { Stack } from "expo-router";
import { AuthProvider } from "./src/context/AuthContext";
import { WorkProvider } from "./src/context/WorkContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
   <WorkProvider>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
    </WorkProvider>
    </GestureHandlerRootView>
  );
}