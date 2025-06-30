import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";

interface MetricCardProps {
  icon: string;
  title: string;
  value: number;
  change: string;
  changeType: "increase" | "decrease";
  iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  change,
  changeType,
  iconColor,
}) => {
  return (
    <CardContainer>
      <TopHighlight />
      <CardContent>
        <LeftSection>
          <IconContainer iconColor={iconColor}>
            <IconText>{icon}</IconText>
          </IconContainer>
          <ValueText>{value}</ValueText>
        </LeftSection>
        <RightSection>
          <TitleText>{title}</TitleText>
          <ChangeContainer>
            <ChangeText changeType={changeType}>{change}</ChangeText>
          </ChangeContainer>
        </RightSection>
      </CardContent>
    </CardContainer>
  );
};

export default MetricCard;
const CardContainer = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  ${Platform.OS === "android" ? "elevation: 8;" : ""}
`;

const TopHighlight = styled.View`
  height: 4px;
  background-color: #1a1a1a;
  width: 100%;
`;

const CardContent = styled.View`
  padding: 20px;
  padding-bottom: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.View`
  flex-direction: column;
  align-items: center;
`;

const RightSection = styled.View`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  margin-left: 16px;
`;

const IconContainer = styled.View<{ iconColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ iconColor }) => iconColor};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const IconText = styled.Text`
  font-size: 20px;
`;

const ValueText = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: #1c1c1c;
`;

const TitleText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #2c2c2c;
  margin-bottom: 8px;
`;

const ChangeContainer = styled.View`
  background-color: #f6d6bd;
  border-radius: 12px;
  padding: 6px 12px;
`;

const ChangeText = styled.Text<{ changeType: string }>`
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #000;
`;
