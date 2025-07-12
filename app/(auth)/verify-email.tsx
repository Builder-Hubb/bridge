import React, { useState } from "react";
import styled from "styled-components/native";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Colours } from "@/constants/Colours";
import VerificationSuccess from "@/components/auth/verification-success";

export default function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [resendLoading, setResendLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleVerify = () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit code");
      return;
    }
    setError(undefined);
    setShowSuccess(true);
  };

  const handleResend = async () => {
    setResendLoading(true);
    // Simulate resend logic
    setTimeout(() => {
      setResendLoading(false);
    }, 1200);
  };

  const handleDone = () => {
    router.push("/(onboarding)/check-in");
  };

  if (showSuccess) {
    return <VerificationSuccess onDone={handleDone} />;
  }

  return (
    <Container>
      <Header>
        <Title>Verify Email</Title>
        <Subtitle>Enter the 6 digit code that was sent to your email</Subtitle>
      </Header>

      <MainDisplay>
        <FormInput
          type="text"
          variant="bottom-border"
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          error={error}
        />

        <ResendRow>
          <ResendText>Didn&apos;t receive the code?</ResendText>
          <ResendButton
            onPress={handleResend}
            disabled={resendLoading}
            activeOpacity={0.7}
          >
            <ResendButtonText disabled={resendLoading}>
              {resendLoading ? "Resending..." : "Resend Code"}
            </ResendButtonText>
          </ResendButton>
        </ResendRow>

        <Button
          label="Verify"
          borderRadius="curved"
          width="full"
          onPress={handleVerify}
        />
      </MainDisplay>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100vw;
  height: 100lvh;
  background: white;
  align-items: center;
  padding-top: 120px;
`;

const Header = styled.View`
  width: 100%;
  max-width: 90%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${Colours.purple[8]};
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: ${Colours.purple[6]};
`;

const MainDisplay = styled.View`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  gap: 28px;
`;

const ResendRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  gap: 6px;
`;

const ResendText = styled.Text`
  color: ${Colours.purple[6]};
  font-size: 14px;
`;

const ResendButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  padding: 0 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ResendButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${({ disabled }) =>
    disabled ? Colours.purple[4] : Colours.purple[8.5]};
  font-weight: 600;
  font-size: 14px;
`;
