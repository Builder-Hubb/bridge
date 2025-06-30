import React from "react";
import styled from "styled-components/native";

interface EmotionalTag {
  emoji: string;
  label: string;
}

interface EmotionalAnalyticsProps {
  tags: EmotionalTag[];
  moodDescription: string;
}

const EmotionalAnalytics: React.FC<EmotionalAnalyticsProps> = ({
  tags,
  moodDescription,
}) => {
  const tagColors = {
    Happy: "#372F42",
    Sad: "#F6D6BD",
    Confused: "#CACACA",
    Excited: "#3BA66B",
  };

  return (
    <Container>
      <Title>Emotional Analytics</Title>
      <SubTitle>Most Used Tags</SubTitle>
      <TagsContainer>
        {tags.map((tag, index) => (
          <TagDisplay
            key={index}
            borderColor={
              tagColors[tag.label as keyof typeof tagColors] || "#E0E0E0"
            }
          >
            <TagEmoji>{tag.emoji}</TagEmoji>
            <TagLabel>{tag.label}</TagLabel>
          </TagDisplay>
        ))}
      </TagsContainer>
      <MoodContainer>
        <MoodChart>
          <ChartEmoji>📈</ChartEmoji>
        </MoodChart>
        <MoodText>{moodDescription}</MoodText>
      </MoodContainer>
    </Container>
  );
};

export default EmotionalAnalytics;

const Container = styled.View`
  background-color: #b5d3d8;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #f5f5f7;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: #1a1a1a;
  margin-bottom: 10px;
`;

const SubTitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #1c1c1c;
  margin-bottom: 14px;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const TagDisplay = styled.View<{ borderColor: string }>`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 10px;
  min-width: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ borderColor }) => borderColor};
`;

const TagEmoji = styled.Text`
  font-size: 16px;
  margin-right: 6px;
`;

const TagLabel = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #1a1a1a;
`;

const MoodContainer = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 10px;
`;

const MoodChart = styled.View`
  height: 50px;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
`;

const ChartEmoji = styled.Text`
  font-size: 40px;
`;

const MoodText = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #1c1c1c;
  text-align: left;
  line-height: 16px;
`;
