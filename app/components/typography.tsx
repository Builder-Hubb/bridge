import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "body"
  | "body2"
  | "caption"
  | "overline"
  | "button";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: TextProps["ellipsizeMode"];
}

const variantStyles: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    fontFamily: "Manrope_700Bold",
  },
  h2: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    fontFamily: "Manrope_700Bold",
  },
  h3: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    fontFamily: "Manrope_700Bold",
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    fontFamily: "Manrope_600SemiBold",
  },
  h5: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    fontFamily: "Manrope_600SemiBold",
  },
  h6: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    fontFamily: "Manrope_600SemiBold",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    fontFamily: "Manrope_500Medium",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    fontFamily: "Manrope_400Regular",
  },
  body2: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    fontFamily: "Manrope_400Regular",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    fontFamily: "Manrope_400Regular",
  },
  overline: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Manrope_500Medium",
  },
  button: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    fontFamily: "Manrope_600SemiBold",
  },
};

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color,
  fontWeight,
  fontFamily,
  style,
  children,
  numberOfLines,
  ellipsizeMode,
  ...rest
}) => {
  const baseStyle = variantStyles[variant] || variantStyles.body;
  const customStyle: TextStyle = {
    ...(color ? { color } : {}),
    ...(fontWeight ? { fontWeight } : {}),
    ...(fontFamily ? { fontFamily } : {}),
  };

  return (
    <Text
      style={[baseStyle, customStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Typography;
