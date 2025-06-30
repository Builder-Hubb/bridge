import { Colours } from "@/constants/Colours";
import React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  width?: "full" | "fit";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  width = "fit",
}) => {
  return (
    <ButtonWrapper
      onPress={onPress}
      disabled={disabled || loading}
      variant={variant}
      width={width}
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
  border-radius: 20px;
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
