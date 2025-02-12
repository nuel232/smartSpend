import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="HomeScreen" />
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="OnboardingScreen" />
        <Stack.Screen name="RegistrationScreen" />
        <Stack.Screen name="WalletBalanceScreen" />
        <Stack.Screen name="SuccessScreen" />
        <Stack.Screen name="TransactionScreen" />
      </Stack>
    </AuthProvider>
  );
}
