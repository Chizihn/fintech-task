import React from "react";
import { View, Text } from "react-native";
import { Button } from "../../components/Button";

interface SuccessProps {
  onNext: () => void;
}

export const Success: React.FC<SuccessProps> = ({ onNext }) => {
  return (
    <View className="flex-1 bg-white px-6 items-center justify-center">
      <View className="flex-1 items-center justify-center w-full">
        <View className="mb-8">
             <Text className="text-6xl">👌🏽</Text>
        </View>

        <Text className="text-2xl font-bold text-slate-900 mb-4 text-center">
          We've confirmed your details
        </Text>
        <Text className="text-lg text-textLight text-center px-4">
          Open your bank account, order your debit card and start using the app.
        </Text>
      </View>

      <View className="w-full pb-8">
        <Button
          title="Let's go !"
          onPress={onNext}
          variant="primary"
          size="large"
        />
      </View>
    </View>
  );
};
