import theme from "@/constants/Theme/theme";
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
  });

  const isAuthenticated = false;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
              <Stack.Screen name="(tabs)" />
            ) : (
              <Stack.Screen name="(auth)/sign-up" />
            )}
          </Stack>
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
