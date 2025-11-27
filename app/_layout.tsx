import "../global.css";
import React, { useEffect, useState } from "react";
import {
  SplashScreen,
  Stack,
  useRouter,
  useSegments,
} from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../constants/Color";
import { useOnboardingStore } from "../store/onboardingStore";


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { hasOnboarded, isAuthenticated } = useOnboardingStore();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for the store to rehydrate
    const rehydrate = async () => {
        // Zustand persist middleware handles rehydration automatically, 
        // but we might want to ensure it's done or add a small delay if needed.
        // For now, we'll assume it's quick enough or we can check if _hasHydrated exists if we added that to the store.
        // Since we didn't add onRehydrateStorage, we can just simulate a check or rely on the initial render.
        // However, to be safe with async storage, let's just set ready after a tick.
        setTimeout(() => {
            setIsReady(true);
            SplashScreen.hideAsync();
        }, 500);
    };
    rehydrate();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";

    if (!hasOnboarded && !inOnboarding) {
      // If not onboarded, redirect to onboarding
      router.replace("/onboarding");
    } else if (hasOnboarded && !isAuthenticated && !inAuthGroup) {
      // If onboarded but not authenticated, redirect to auth (login/signup)
      // We'll default to the auth index or login
      router.replace("/(auth)");
    } else if (isAuthenticated && (inOnboarding || inAuthGroup)) {
      // If authenticated, redirect to home (assuming app/index.tsx is home)
      router.replace("/");
    }
  }, [hasOnboarded, isAuthenticated, segments, isReady]);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
