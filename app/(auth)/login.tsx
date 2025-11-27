import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";
import { useOnboardingStore } from "../../store/onboardingStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenHeader } from "../../components/ScreenHeader";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useOnboardingStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Mock login
    login({ email });
    router.replace("/");
  };

  return (
    <ScreenWrapper className="bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <ScreenHeader />

        <View className="mt-4 flex-1">
          <Text className="text-2xl font-bold text-slate-900 mb-8">
            Log in to your account
          </Text>

          <Input
            label="Email address"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="justify-end pb-8 mt-auto">
          <Button
            title="Log in"
            onPress={handleLogin}
            disabled={!email || !password}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}
