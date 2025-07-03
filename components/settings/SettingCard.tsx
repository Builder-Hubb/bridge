import CustomIcon from "@/app/components/ui/CustomIcon";
import { Colours } from "@/constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

interface SettingCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <CardContainer onPress={onPress}>
      <IconContainer>
        <CustomIcon svgString={icon} size={24} color="#292D32" />
      </IconContainer>
      <ContentContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </ContentContainer>
      <ArrowIcon name="chevron-forward" size={20} />
    </CardContainer>
  );
};

const CardContainer = styled.Pressable`
  background-color: ${Colours.green[0]};
  border-radius: 16px;
  border: 2px solid ${Colours.green[1]};
  padding: 24px;
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled(View)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const ContentContainer = styled(View)`
  flex: 1;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: ${Colours.black[0]};
  margin-bottom: 4px;
`;

const Subtitle = styled(Text)`
  font-size: 14px;
  color: ${Colours.black[1]};
  font-weight: 500;
`;

const ArrowIcon = styled(Ionicons)`
  color: ${Colours.black[2]};
`;

export default SettingCard;
