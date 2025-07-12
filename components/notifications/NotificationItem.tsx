import { Colours } from "@/constants/Colours";
import React from "react";
import styled from "styled-components/native";

export interface NotificationItemProps {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  title: string;
  message: string;
  timestamp: string;
  showReply?: boolean;
  onReply?: () => void;
  onPress?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  sender,
  title,
  message,
  timestamp,
  showReply = false,
  onReply,
  onPress,
}) => {
  return (
    <NotificationContainer onPress={onPress} activeOpacity={0.7}>
      <Avatar source={{ uri: sender.avatar }} />
      <ContentContainer>
        <HeaderRow>
          <SenderName>{sender.name}</SenderName>
          <Timestamp>{timestamp}</Timestamp>
        </HeaderRow>
        <Title>{title}</Title>
        <MessageContainer>
          <Message>{message}</Message>
          {showReply && (
            <ReplyButton onPress={onReply} activeOpacity={0.8}>
              <ReplyText>Reply</ReplyText>
            </ReplyButton>
          )}
        </MessageContainer>
      </ContentContainer>
    </NotificationContainer>
  );
};

const NotificationContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px;
  background-color: #f5f5f7;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const SenderName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  font-family: Manrope_600SemiBold;
  color: #1a1a1a;
  flex: 1;
`;

const Timestamp = styled.Text`
  font-size: 12px;
  color: #666666;
  margin-left: 8px;
  font-weight: 400;
  font-family: Manrope_400Regular;
`;

const Title = styled.Text`
  font-size: 12px;
  color: #333333;
  margin-bottom: 4px;
  line-height: 18px;
  font-weight: 400;
  font-family: Manrope_400Regular;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const Message = styled.Text`
  font-size: 14px;
  font-weight: 500;
  font-family: Manrope_500Medium;
  color: #666666;
  line-height: 18px;
  flex: 1;
  margin-right: 12px;
`;

const ReplyButton = styled.TouchableOpacity`
  background-color: ${Colours.purple[8.5]};
  border-radius: 20px;
  padding: 8px 16px;
`;

const ReplyText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  font-family: Manrope_600SemiBold;
`;
