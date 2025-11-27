import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";

interface PhoneNumberProps {
  onNext: (phoneNumber: string) => void;
  onBack: () => void;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({ onNext, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View className="flex-1 bg-white px-6">
      {/* Header */}
      <View className="flex-row items-center py-4">
        <TouchableOpacity onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-2xl font-bold text-slate-900 mb-2">
          Enter your phone number
        </Text>
        <Text className="text-base text-slate-500 mb-8">
          We use your mobile number to identify your account
        </Text>

        <Input
          label="Phone number"
          placeholder="1234 567891"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          leftComponent={
            <View className="flex-row items-center mr-3 border-r border-slate-200 pr-3">
              <Text className="text-xl mr-2">🇬🇧</Text>
              <Text className="text-base font-medium text-slate-900">+44</Text>
            </View>
          }
        />
        
         <Text className="text-xs text-slate-400 mt-2">
          By tapping Get started, you agree to the Terms & Conditions
        </Text>
      </View>

      <View className="flex-1 justify-end pb-8">
        <Button
          title="Get started"
          onPress={() => onNext(phoneNumber)}
          disabled={phoneNumber.length < 5} 
        />
      </View>
    </View>
  );
};
