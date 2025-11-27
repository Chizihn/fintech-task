import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenHeader } from "../../components/ScreenHeader";

interface EmailProps {
  onNext: (email: string) => void;
  onBack: () => void;
}

export const Email: React.FC<EmailProps> = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");

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
            Your email address
          </Text>
          <Text className="text-lg text-textLight mb-8">
            Get information about your account and updates to your app.
          </Text>

          <Input
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon="mail"
            autoCapitalize="none"
          />
          
          <Text className="text-md text-textLight mt-2">
            Once your account is created we'll send you a verification link.
          </Text>
        </View>

        <View className="justify-end pb-8 mt-auto">
          <Button
            title="Next"
            onPress={() => onNext(email)}
            size="large"
            disabled={!email || !email.includes("@")}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
