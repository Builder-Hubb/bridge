import React from "react";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";
import { Colours } from "@/constants/Colours";

interface VerificationSuccessProps {
  onDone: () => void;
}

const VerificationSuccess: React.FC<VerificationSuccessProps> = ({
  onDone,
}) => {
  return (
    <Container>
      <CheckmarkContainer>
        <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
          <Path
            d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM19.2 34.2L8.4 23.4L11.4 20.4L19.2 28.2L36.6 10.8L39.6 13.8L19.2 34.2Z"
            fill={Colours.green[5] || "#34C759"}
          />
        </Svg>
      </CheckmarkContainer>
      <SuccessText>Email Verified Successfully!</SuccessText>
      <DoneButton onPress={onDone} activeOpacity={0.8}>
        <DoneButtonText>Done</DoneButtonText>
      </DoneButton>
    </Container>
  );
};

export default VerificationSuccess;

const Container = styled.View`
  flex: 1;
  background: #f8f8fc;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

const CheckmarkContainer = styled.View`
  margin-bottom: 32px;
  background: transparent;
  align-items: center;
  justify-content: center;
`;

const SuccessText = styled.Text`
  font-size: 18px;
  color: #22223b;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 500;
`;

const DoneButton = styled.TouchableOpacity`
  width: 100%;
  max-width: 370px;
  background: #2d253a;
  padding: 12px 0;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

const DoneButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
