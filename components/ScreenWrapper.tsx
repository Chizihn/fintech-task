import React from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/Color";

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
  backgroundColor?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  className = "",
  backgroundColor = colors.background,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
};
