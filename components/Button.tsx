import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/Color";

export type IconType = "feather" | "material";

export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline" | "text" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Feather.glyphMap | keyof typeof MaterialIcons.glyphMap;
  iconType?: IconType;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
  activeOpacity?: number;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconType = "feather",
  iconPosition = "left",
  fullWidth = true,
  style,
  textStyle,
  className = "",
  activeOpacity = 0.7,
  children,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-300";
    switch (variant) {
      case "primary":
        return "bg-[#1A3EEC]"; // Using the primary color from Color.ts
      case "secondary":
        return "bg-[#0D2A9A]";
      case "danger":
        return "bg-red-500";
      case "outline":
      case "text":
      case "ghost":
        return "bg-transparent";
      default:
        return "bg-[#1A3EEC]";
    }
  };

  const getBorderColor = () => {
    if (disabled) return "border-transparent";
    switch (variant) {
      case "outline":
        return "border border-gray-300";
      default:
        return "border-transparent";
    }
  };

  const getTextColor = () => {
    if (disabled) return "text-gray-500";
    switch (variant) {
      case "primary":
      case "secondary":
      case "danger":
        return "text-white";
      case "outline":
        return "text-slate-900";
      case "text":
        return "text-text";
      case "ghost":
        return "text-[#1A3EEC]";
      default:
        return "text-white";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "py-2 px-4";
      case "large":
        return "py-4 px-8";
      default:
        return "py-3.5 px-6"; // Medium
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    const IconComponent = iconType === "material" ? MaterialIcons : Feather;
    const iconColor =
      variant === "outline" || variant === "text" || variant === "ghost"
        ? colors.primary
        : "white";

    return (
      <IconComponent
        name={icon as any}
        size={20}
        color={disabled ? "#9CA3AF" : iconColor}
        style={{
          marginRight: iconPosition === "left" && title ? 8 : 0,
          marginLeft: iconPosition === "right" && title ? 8 : 0,
        }}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
      className={`
        flex-row items-center justify-center rounded-full
        ${getBackgroundColor()}
        ${getBorderColor()}
        ${getSizeStyles()}
        ${fullWidth ? "w-full" : "self-start"}
        ${disabled ? "opacity-70" : "opacity-100"}
        ${className}
      `}
      style={style}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "text" ? colors.primary : "white"
          }
        />
      ) : (
        <>
          {iconPosition === "left" && renderIcon()}
          {title ? (
            <Text
              className={`font-semibold text-center ${getTextColor()} ${getTextSize()}`}
              style={textStyle}
            >
              {title}
            </Text>
          ) : null}
          {children}
          {iconPosition === "right" && renderIcon()}
        </>
      )}
    </TouchableOpacity>
  );
};
