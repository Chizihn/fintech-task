import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";

interface EmailProps {
  onNext: (email: string) => void;
  onBack: () => void;
}

export const Email: React.FC<EmailProps> = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-row items-center py-4">
        <TouchableOpacity onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-2xl font-bold text-slate-900 mb-2">
          Your email address
        </Text>
        <Text className="text-base text-slate-500 mb-8">
          Get information about your account and updates to your app.
        </Text>

        <Input
          label="Email address"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text className="text-xs text-slate-400 mt-2">
          Once your account is created we'll send you a verification link.
        </Text>
      </View>

      <View className="flex-1 justify-end pb-8">
        <Button
          title="Next"
          onPress={() => onNext(email)}
          disabled={!email || !email.includes("@")}
        />
      </View>
    </View>
  );
};
