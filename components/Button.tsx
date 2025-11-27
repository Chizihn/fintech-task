// src/components/Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Responsive } from "../util/responsive";
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
  iconType?: IconType; // New: choose icon set
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
  iconType = "feather", // Feather by default
  iconPosition = "left",
  fullWidth = true,
  style,
  textStyle,
  className,
  activeOpacity,
  children,
}) => {

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "small":
        return {
          paddingVertical: Responsive.spacing(8),
          paddingHorizontal: Responsive.spacing(16),
        };
      case "large":
        return {
          paddingVertical: Responsive.spacing(16),
          paddingHorizontal: Responsive.spacing(32),
        };
      case "medium":
      default:
        return {
          paddingVertical: Responsive.spacing(14),
          paddingHorizontal: Responsive.spacing(24),
        };
    }
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Responsive.scale(30),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: fullWidth ? "100%" : undefined,
      minHeight: Responsive.scale(48),
    };

    const sizeStyle = getSizeStyle();

    let variantStyle: ViewStyle = {};
    switch (variant) {
      case "primary":
        variantStyle.backgroundColor =
          disabled || loading ? colors.card : colors.primary;
        break;
      case "secondary":
        variantStyle.backgroundColor =
          disabled || loading ? colors.border : colors.card;
        break;
      case "outline":
        variantStyle = {
          backgroundColor: "transparent",
          borderWidth: Responsive.scale(1.5),
          borderColor: disabled || loading ? colors.border : colors.primary,
        };
        break;
      case "text":
      case "ghost":
        variantStyle.backgroundColor = "transparent";
        break;
      case "danger":
        variantStyle.backgroundColor =
          disabled || loading ? colors.placeholder : colors.error;
        break;
    }

    return { ...baseStyle, ...sizeStyle, ...variantStyle };
  };

  const getTextColor = (): string => {
    if (disabled || loading) return colors.placeholder;

    switch (variant) {
      case "primary":
      case "danger":
        return colors.background;
      case "secondary":
        return colors.text;
      case "outline":
      case "text":
      case "ghost":
      default:
        return colors.primary;
    }
  };


  const getTextSize = (): TextStyle => {
    switch (size) {
      case "small":
        return {
          fontSize: Responsive.scale(14),
          fontWeight: "500",
        };
      case "large":
        return {
          fontSize: Responsive.scale(16),
          fontWeight: "600",
        };
      case "medium":
      default:
        return {
          fontSize: Responsive.scale(16),
          fontWeight: "500",
        };
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case "small":
        return Responsive.scale(16);
      case "large":
        return Responsive.scale(22);
      default:
        return Responsive.scale(20);
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconStyle = {
      marginRight: iconPosition === "left" ? Responsive.spacing(8) : 0,
      marginLeft: iconPosition === "right" ? Responsive.spacing(8) : 0,
    };

    const iconColor = getTextColor();

    return iconType === "material" ? (
      <MaterialIcons
        name={icon as keyof typeof MaterialIcons.glyphMap}
        size={getIconSize()}
        color={iconColor}
        style={iconStyle}
      />
    ) : (
      <Feather
        name={icon as keyof typeof Feather.glyphMap}
        size={getIconSize()}
        color={iconColor}
        style={iconStyle}
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ActivityIndicator
            size="small"
            color={
              variant === "primary" || variant === "danger"
                ? colors.background
                : colors.primary
            }
          />
          {title && (
            <Text
              style={[
                getTextSize(),
                { color: getTextColor(), marginLeft: Responsive.spacing(8) },
                textStyle,
              ]}
            >
              Loading...
            </Text>
          )}
        </View>
      );
    }

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {iconPosition === "left" && renderIcon()}
        {children
          ? children
          : title && (
              <Text
                style={[getTextSize(), { color: getTextColor() }]}
                className={`${textStyle}`}
              >
                {title}
              </Text>
            )}
        {iconPosition === "right" && renderIcon()}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
      activeOpacity={activeOpacity || 0.7}
      className={className}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};
