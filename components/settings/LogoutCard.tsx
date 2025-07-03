import CustomIcon from "@/app/components/ui/CustomIcon";
import { Colours } from "@/constants/Colours";
import { OUT_ARROW_ICON } from "@/constants/icons";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

interface LogoutCardProps {
  onPress: () => void;
}

const LogoutCard: React.FC<LogoutCardProps> = ({ onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <IconContainer>
        <CustomIcon
          svgString={OUT_ARROW_ICON}
          size={24}
          color={Colours.red[1]}
        />
      </IconContainer>
      <Title>Log Out</Title>
    </CardContainer>
  );
};

const CardContainer = styled.Pressable`
  background-color: ${Colours.green[0]};
  border-radius: 16px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  border: 2px solid ${Colours.red[1]}20;
`;

const IconContainer = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Colours.red[1]}20;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: ${Colours.red[1]};
  flex: 1;
`;

export default LogoutCard;
