import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Learn" options={{ title: 'Learn' }} />
      <Stack.Screen name="MultiCropping" options={{ title: 'Multicropping' }} />
      <Stack.Screen name="Agroforestry" options={{ title: 'Agroforestry' }} />
      <Stack.Screen name="Market" options={{ title: 'Market' }} />
      <Stack.Screen name="Feedback" options={{ title: 'Feedback' }} />
    </Stack>
  );
}