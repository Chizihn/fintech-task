import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface PasscodeProps {
  onNext: (passcode: string) => void;
  onBack: () => void;
}

export const Passcode: React.FC<PasscodeProps> = ({ onNext, onBack }) => {
  const [passcode, setPasscode] = useState<string[]>([]);
  
  const handlePress = (num: string) => {
    if (passcode.length < 4) {
      const newPasscode = [...passcode, num];
      setPasscode(newPasscode);
      if (newPasscode.length === 4) {
        setTimeout(() => {
            onNext(newPasscode.join(""));
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPasscode(passcode.slice(0, -1));
  };

  return (
    <View className="flex-1 bg-[#1A3EEC]">
      <View className="flex-1 items-center pt-20">
        <View className="flex-row space-x-4 mb-12">
            {[0, 1, 2, 3].map((i) => (
                <View
                    key={i}
                    className={`w-4 h-4 rounded-full border-2 border-white ${
                        passcode.length > i ? "bg-white" : "bg-transparent"
                    }`}
                />
            ))}
        </View>

        <Text className="text-2xl font-bold text-white mb-2">
          Create a passcode
        </Text>
        <Text className="text-base text-white/70 mb-8">
          Create a passcode for your app login
        </Text>

        <View className="flex-1 justify-end pb-12 w-full px-12">
            <View className="flex-row flex-wrap justify-between gap-y-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <TouchableOpacity
                        key={num}
                        className="w-[30%] aspect-square items-center justify-center"
                        onPress={() => handlePress(num.toString())}
                    >
                        <Text className="text-3xl font-semibold text-white">{num}</Text>
                    </TouchableOpacity>
                ))}
                <View className="w-[30%] aspect-square" />
                <TouchableOpacity
                    className="w-[30%] aspect-square items-center justify-center"
                    onPress={() => handlePress("0")}
                >
                    <Text className="text-3xl font-semibold text-white">0</Text>
                </TouchableOpacity>
                 <TouchableOpacity
                    className="w-[30%] aspect-square items-center justify-center"
                    onPress={handleDelete}
                >
                    <Text className="text-xl text-white font-bold">⌫</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
};
