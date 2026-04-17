import { Stack } from "expo-router";
import { AuthProvider } from "./src/context/AuthContext";
import { WorkProvider } from "./src/context/WorkContext";
export default function RootLayout() {
  return (
   <WorkProvider>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
    </WorkProvider>
  );
}