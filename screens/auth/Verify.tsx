import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";

interface VerifyProps {
  phoneNumber: string;
  onNext: () => void;
  onBack: () => void;
}

export const Verify: React.FC<VerifyProps> = ({ phoneNumber, onNext, onBack }) => {
  const [code, setCode] = useState("");

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-row items-center py-4">
        <TouchableOpacity onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-2xl font-bold text-slate-900 mb-2">
          Enter the code we texted you
        </Text>
        <Text className="text-base text-slate-500 mb-8">
          We've sent an SMS to +44 {phoneNumber}
        </Text>

        <View className="w-full mb-4">
          <Text className="text-sm font-medium text-slate-500 mb-1.5 ml-1">
            SMS code
          </Text>
          <View className="flex-row items-center border border-primary rounded-xl px-4 py-3.5 bg-white">
             <TextInput
                className="flex-1 text-base text-primary font-semibold"
                placeholder="123 456"
                placeholderTextColor={colors.placeholder}
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                autoFocus
                maxLength={6}
             />
          </View>
        </View>

        <Text className="text-sm text-slate-500 mb-4">
          Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
        </Text>

        <TouchableOpacity>
          <Text className="text-primary font-semibold">Resend code</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-end pb-8">
        <Button
          title="Submit"
          onPress={onNext}
          disabled={code.length < 4}
        />
      </View>
    </View>
  );
};
