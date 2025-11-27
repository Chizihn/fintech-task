import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";
import { useOnboardingStore } from "../../store/onboardingStore";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useOnboardingStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Mock login
    login({ email, firstName: "User" });
    router.replace("/");
  };

  return (
    <ScreenWrapper className="bg-white px-6">
      <View className="flex-1">
        <View className="flex-row items-center py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <Text className="text-2xl font-bold text-slate-900 mb-2">
            Log in
          </Text>
          <Text className="text-base text-slate-500 mb-8">
            Welcome back! Please enter your details.
          </Text>

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="flex-1 justify-end pb-8">
          <Button
            title="Log in"
            onPress={handleLogin}
            disabled={!email || !password}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
