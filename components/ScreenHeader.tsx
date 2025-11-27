import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/Color";
import { useRouter } from "expo-router";

interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  showBackButton = true,
  rightComponent,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between py-4">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={handleBack} className="mr-4">
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        {title && (
          <Text className="text-xl font-bold text-slate-900">{title}</Text>
        )}
      </View>
      {rightComponent}
    </View>
  );
};
