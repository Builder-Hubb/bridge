import { Ionicons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";

interface MoodInsight {
  id: string;
  title: string;
  description: string;
  type: "pattern" | "improvement" | "concern";
}

interface MoodInsightsProps {
  insights: MoodInsight[];
}

const MoodInsights: React.FC<MoodInsightsProps> = ({ insights }) => {
  return (
    <Container>
      {insights.map((insight) => (
        <InsightCard key={insight.id}>
          <InsightHeader>
            <InsightIconContainer>
              <Ionicons name="bulb-sharp" size={24} color="#F9F4AD"></Ionicons>
            </InsightIconContainer>

            <InsightTitle>{insight.title}</InsightTitle>
          </InsightHeader>
          <InsightDescription>{insight.description}</InsightDescription>
        </InsightCard>
      ))}
    </Container>
  );
};

export default MoodInsights;

const Container = styled.View`
  margin: 0 20px 20px 20px;
`;

const InsightCard = styled.View`
  padding: 20px;
  margin-bottom: 16px;
  background-color: #f6d6bd;
  border-radius: 24px;
`;

const InsightHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;
const InsightIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #aaa44b;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const InsightTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #1c1c1c;
  font-family: Manrope_600SemiBold;
`;
const InsightDescription = styled.Text`
  font-weight: 400;
  color: #2c2c2c;
  font-family: Manrope_400Regular;
  font-size: 14px;
`;
