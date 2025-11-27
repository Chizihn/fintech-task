import React from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/Color";

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
  backgroundColor?: string;
  useSafeArea?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  className = "",
  backgroundColor = colors.background,
  useSafeArea = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor,
          paddingTop: useSafeArea ? insets.top : 0,
          paddingBottom: useSafeArea ? insets.bottom : 0,
          paddingLeft: useSafeArea ? insets.left : 0,
          paddingRight: useSafeArea ? insets.right : 0,
        },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
};
