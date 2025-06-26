import { Colours } from "@/constants/Colours";
import React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
}) => {
  return (
    <ButtonWrapper
      onPress={onPress}
      disabled={disabled || loading}
      variant={variant}
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
}>`
  background-color: ${({ disabled, variant }) =>
    disabled
      ? Colours.purple[3]
      : variant === "primary"
        ? Colours.purple[8.5]
        : Colours.green[5]};
  padding: 12px 32px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text<{ variant: string }>`
  color: ${Colours.green[0]};
  font-size: 18px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 16px;
`;
