import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";

interface DetailsProps {
  onNext: (details: { firstName: string; lastName: string; middleName?: string }) => void;
  onBack: () => void;
}

export const Details: React.FC<DetailsProps> = ({ onNext, onBack }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-row items-center py-4">
        <TouchableOpacity onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-2xl font-bold text-slate-900 mb-2">
          About you
        </Text>
        <Text className="text-base text-slate-500 mb-8">
          Please enter your full name as it appears on your ID.
        </Text>

        <Input
          label="First name"
          placeholder="Unflow"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          label="Middle name"
          placeholder=""
          value={middleName}
          onChangeText={setMiddleName}
        />
        <Input
          label="Last name"
          placeholder=""
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className="flex-1 justify-end pb-8">
        <Button
          title="Next"
          onPress={() => onNext({ firstName, lastName, middleName })}
          disabled={!firstName || !lastName}
        />
      </View>
    </View>
  );
};
