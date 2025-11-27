import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenHeader } from "../../components/ScreenHeader";

interface DetailsProps {
  onNext: (details: { firstName: string; lastName: string; middleName?: string }) => void;
  onBack: () => void;
}

export const Details: React.FC<DetailsProps> = ({ onNext, onBack }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        bounces={false}
      >
        <ScreenHeader onBack={onBack} />

        <View className="mt-4 flex-1">
          <Text className="text-2xl font-bold text-slate-900 mb-3">
            About you
          </Text>
          <Text className="text-lg text-slate-500 mb-8">
            Please enter your full name as it appears on your ID.
          </Text>

          <View className="flex-col gap-4">
            <Input
            label="First name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
            labelPlacement="border"
          />
          <Input
            label="Middle name"
            placeholder="Enter your middle name"
            value={middleName}
            onChangeText={setMiddleName}
            labelPlacement="border"
          />
          <Input
            label="Last name"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            labelPlacement="border"
          />
          </View>
        </View>

        <View className="justify-end pb-8 mt-auto">
          <Button
            title="Next"
            onPress={() => onNext({ firstName, lastName, middleName })}
            size="large"
            disabled={!firstName || !lastName}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
