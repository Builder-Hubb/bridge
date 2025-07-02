import { Colours } from "@/constants/Colours";
import React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";

type BorderRadiusType = "flat" | "curved" | "rounded";

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  width?: "full" | "fit";
  borderRadius?: BorderRadiusType;
}

const getBorderRadius = (borderRadius?: BorderRadiusType) => {
  switch (borderRadius) {
    case "flat":
      return "0px";
    case "curved":
      return "8px";
    case "rounded":
    default:
      return "20px";
  }
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  width = "fit",
  borderRadius = "rounded",
}) => {
  return (
    <ButtonWrapper
      onPress={onPress}
      disabled={disabled || loading}
      variant={variant}
      width={width}
      borderRadius={borderRadius}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colours.green[0]} />
      ) : (
        <ButtonText variant={variant}>{label}</ButtonText>
      )}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.TouchableOpacity<{
  disabled?: boolean;
  variant: string;
  width: string;
  borderRadius?: BorderRadiusType;
}>`
  background-color: ${({ disabled, variant }) =>
    disabled
      ? Colours.purple[3]
      : variant === "primary"
        ? Colours.purple[8.5]
        : variant === "outline"
          ? "transparent"
          : Colours.green[5]};
  border: ${({ variant }) =>
    variant === "outline" ? `1px solid ${Colours.purple[8.5]}` : "none"};
  padding: 9px 25px;
  border-radius: ${({ borderRadius }) => getBorderRadius(borderRadius)};
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width === "full" ? "100%" : "auto")};
  align-self: ${({ width }) => (width === "full" ? "stretch" : "center")};
`;

const ButtonText = styled.Text<{ variant: string }>`
  color: ${({ variant }) =>
    variant === "outline" ? Colours.purple[8.5] : Colours.green[0]};
  font-size: 14px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;
