import { Colours } from "@/constants/Colours";
import React from "react";
import styled from "styled-components/native";

interface MoodStats {
  overallMood: number;
  averageMonthlyMood: number;
  tagsUsed: number;
  weeklyAverage: number;
  percentageChange: number;
}

interface MoodOverviewCardProps {
  stats: MoodStats;
}

const MoodOverviewCard: React.FC<MoodOverviewCardProps> = ({ stats }) => {
  return (
    <Container>
      <TopHighlight />
      <StatItem>
        <StatValue>{stats.overallMood}</StatValue>
        <StatLabel>Overall mood</StatLabel>
      </StatItem>

      <Divider />

      <StatItem>
        <StatValue>{stats.averageMonthlyMood}</StatValue>
        <StatLabel>Average mood in a month</StatLabel>
      </StatItem>

      <Divider />

      <StatItem>
        <StatValue>{stats.tagsUsed}</StatValue>
        <StatLabel>Tags Used</StatLabel>
      </StatItem>
    </Container>
  );
};

export default MoodOverviewCard;

const Container = styled.View`
  margin: 0 20px 20px 20px;
  background-color: ${Colours.green[0]};
  border-radius: 16px;
  padding: 24px;
  shadow-color: ${Colours.purple[8.5]};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
`;

const TopHighlight = styled.View`
  height: 4px;
  background-color: #1a1a1a;
  width: 100%;
`;

const StatItem = styled.View`
  align-items: center;
  padding: 12px 0;
`;

const StatValue = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${Colours.purple[8.5]};
  font-family: Manrope_700Bold;
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  color: ${Colours.purple[6]};
  font-family: Manrope_400Regular;
  text-align: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${Colours.purple[2]};
  margin: 8px 0;
`;
