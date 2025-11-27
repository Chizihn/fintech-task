import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/Color";

interface PasscodeViewProps {
  title?: string;
  subtitle?: string;
  onComplete: (passcode: string) => void;
  length?: number;
  onBack?: () => void;
}

export const PasscodeView: React.FC<PasscodeViewProps> = ({
  title = "Enter passcode",
  subtitle = "Please enter your passcode",
  onComplete,
  length = 4,
  onBack,
}) => {
  const [passcode, setPasscode] = useState<string[]>([]);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const insets = useSafeAreaInsets();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePress = (num: string) => {
    if (passcode.length < length) {
      const newPasscode = [...passcode, num];
      setPasscode(newPasscode);
      
      // Show the number temporarily
      setVisibleIndex(newPasscode.length - 1);
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setVisibleIndex(null);
      }, 1000);

      if (newPasscode.length === length) {
        setTimeout(() => {
          onComplete(newPasscode.join(""));
          setPasscode([]); 
          setVisibleIndex(null);
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPasscode(passcode.slice(0, -1));
    setVisibleIndex(null);
  };

  return (
    <View className="flex-1 bg-primary">
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {onBack && (
        <View 
            className="absolute left-6 z-10"
            style={{ top: insets.top + 10 }}
        >
            <TouchableOpacity onPress={onBack}>
                <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
        </View>
      )}

      <View 
        className="flex-1 items-center justify-center"
        style={{ paddingTop: insets.top + 20 }}
      >
        <Text className="text-2xl font-bold text-white mb-2 text-center">
          {title}
        </Text>
        <Text className="text-base text-white/70 mb-12 text-center px-8">
          {subtitle}
        </Text>

        {/* Dots */}
        <View className="flex-row gap-8 mb-12 h-12 items-center">
          {Array.from({ length }).map((_, i) => {
             const isVisible = visibleIndex === i;
             const isFilled = passcode.length > i;
             
             return (
                <View key={i} className="w-8 h-8 items-center justify-center">
                    {isVisible ? (
                        <Text className="text-2xl font-bold text-white">
                            {passcode[i]}
                        </Text>
                    ) : (
                        <View
                            className={`w-4 h-4 rounded-full border-2 border-white ${
                                isFilled ? "bg-white" : "bg-transparent"
                            }`}
                        />
                    )}
                </View>
             );
          })}
        </View>

        {/* Keypad */}
        <View className="justify-end w-full px-12">
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
