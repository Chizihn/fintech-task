import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Button } from "../../components/Button";
import { colors } from "../../constants/Color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenHeader } from "../../components/ScreenHeader";

interface VerifyProps {
  phoneNumber: string;
  onNext: () => void;
  onBack: () => void;
}

export const Verify: React.FC<VerifyProps> = ({ phoneNumber, onNext, onBack }) => {
  const [code, setCode] = useState("");

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <ScreenHeader onBack={onBack} />

        <View className="mt-4 flex-1">
          <Text className="text-2xl font-bold text-slate-900 mb-3">
            Enter the code we texted you
          </Text>
          <Text className="text-base text-slate-500 mb-8">
            We've sent an SMS to {phoneNumber}
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

        <View className="justify-end pb-8 mt-auto">
          <Button
            title="Submit"
            onPress={onNext}
            size="large"
            disabled={code.length < 4}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
