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
  ...props
}) => {
  return (
    <View className={`w-full mb-4 ${className}`} style={containerStyle}>
      {label && (
        <Text
          className="text-sm font-medium text-slate-700 mb-1.5"
          style={labelStyle}
        >
          {label}
        </Text>
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
          className="flex-1 text-base text-slate-900"
          placeholderTextColor={colors.placeholder}
          style={inputStyle}
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
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};
