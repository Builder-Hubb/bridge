import React, { useState } from "react";
import styled from "styled-components/native";
import { Colours } from "../../constants/Colours";

interface PendingMessagesCardProps {
  messageText: string;
  onViewMessage: () => void;
  onMaybeLater: () => void;
}

const PendingMessagesCard: React.FC<PendingMessagesCardProps> = ({
  messageText,
  onViewMessage,
  onMaybeLater,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleMaybeLaterPress = () => {
    setVisible(false);
    onMaybeLater();
  };

  return (
    <Card>
      <Title>Pending messages</Title>
      <MessageText>{messageText}</MessageText>
      <ButtonContainer>
        <PrimaryButton onPress={onViewMessage}>
          <PrimaryButtonText>View Message</PrimaryButtonText>
        </PrimaryButton>
        <SecondaryButton onPress={handleMaybeLaterPress}>
          <SecondaryButtonText>Maybe Later</SecondaryButtonText>
        </SecondaryButton>
      </ButtonContainer>
    </Card>
  );
};

const Card = styled.View`
  background-color: white;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colours.black[3]};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${Colours.purple[8]};
  font-family: Manrope_600SemiBold;
  margin-bottom: 8px;
`;

const MessageText = styled.Text`
  font-size: 16px;
  color: ${Colours.purple[7]};
  font-family: Manrope_400Regular;
  margin-bottom: 20px;
  line-height: 22px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${Colours.purple[8]};
  padding: 12px 24px;
  border-radius: 24px;
  flex: 1;
`;

const PrimaryButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  font-family: Manrope_600SemiBold;
`;

const SecondaryButton = styled.TouchableOpacity`
  border: 1px solid ${Colours.purple[8.5]};
  padding: 12px 24px;
  border-radius: 24px;
  flex: 1;
`;

const SecondaryButtonText = styled.Text`
  color: ${Colours.purple[8]};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  font-family: Manrope_600SemiBold;
`;

export default PendingMessagesCard;
