import React from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/Color";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Feather.glyphMap;
  rightIcon?: keyof typeof Feather.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  leftComponent?: React.ReactNode;
  labelPlacement?: "top" | "border";
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  leftComponent,
  className = "",
  labelPlacement = "top",
  ...props
}) => {
  return (
    <View className={`w-full mb-4 ${className}`} style={containerStyle}>
      {label && labelPlacement === "top" && (
        <Text
          className="text-md font-medium text-slate-700 mb-1.5"
          style={labelStyle}
        >
          {label}
        </Text>
      )}
      
      <View className="relative">
        {label && labelPlacement === "border" && (
            <View className="absolute -top-2.5 left-3 z-10 bg-white px-1">
                <Text
                    className="text-md font-medium text-slate-500"
                    style={labelStyle}
                >
                    {label}
                </Text>
            </View>
        )}

        <View
            className={`
            flex-row items-center border rounded-xl px-4 py-3.5 bg-white
            ${error ? "border-red-500" : "border-slate-200"}
            focus:border-primary
            `}
        >
            {leftComponent}
            {leftIcon && !leftComponent && (
            <Feather
                name={leftIcon}
                size={20}
                color={colors.placeholder}
                style={{ marginRight: 10 }}
            />
            )}
            <TextInput
            className="flex-1 text-md text-textLight"
            placeholderTextColor={colors.textLight}
            style={[
                { paddingVertical: 4, textAlignVertical: 'center' },
                inputStyle
            ]}
            {...props}
            />
            {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
                <Feather
                name={rightIcon}
                size={20}
                color={colors.placeholder}
                style={{ marginLeft: 10 }}
                />
            </TouchableOpacity>
            )}
        </View>
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};