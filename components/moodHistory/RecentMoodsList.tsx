import { Colours } from "@/constants/Colours";
import React from "react";
import styled from "styled-components/native";

interface MoodEntry {
  id: string;
  tag: string;
  score: number;
  timestamp: Date;
  note?: string;
  color: string;
}

interface RecentMoodsListProps {
  entries: MoodEntry[];
  frequency: { [key: string]: { count: number; color: string } };
}

const RecentMoodsList: React.FC<RecentMoodsListProps> = ({
  entries,
  frequency,
}) => {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return (
        "Yesterday, " +
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    } else {
      const days = Math.floor(diffInHours / 24);
      return (
        `${days} days ago, ` +
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
  };

  const getFrequencyText = (tag: string) => {
    const freq = frequency[tag];
    if (!freq) return "1 time this month";

    const count = freq.count;
    return `${count} ${count === 1 ? "time" : "times"} this month`;
  };

  return (
    <Container>
      {entries.map((entry) => (
        <MoodCard key={entry.id}>
          <MoodHeader>
            <MoodTagContainer>
              <MoodTag>
                <MoodTagText>{entry.tag}</MoodTagText>
              </MoodTag>
              <TimestampText>{formatTimestamp(entry.timestamp)}</TimestampText>
            </MoodTagContainer>
            <FrequencyText>{getFrequencyText(entry.tag)}</FrequencyText>
          </MoodHeader>

          {entry.note && <NoteText>{entry.note}</NoteText>}
        </MoodCard>
      ))}
    </Container>
  );
};

export default RecentMoodsList;

const Container = styled.View`
  margin: 0 20px;
`;

const MoodCard = styled.View`
  background-color: ${Colours.green[0]};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #dfdde2;
`;

const MoodHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const MoodTagContainer = styled.View`
  flex: 1;
`;

const MoodTag = styled.View`
  align-self: flex-start;
  align-items: center;
  margin-bottom: 6px;
`;

const MoodTagText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #1c1c1c;
  font-family: Manrope_600SemiBold;
`;

const FrequencyText = styled.Text`
  font-size: 14px;
  color: #3ba66b;
  font-family: Manrope_500Medium;
  font-weight: 500;
`;

const TimestampText = styled.Text`
  font-size: 14px;
  color: #1b1f26b8;
  font-family: Manrope_400Regular;
`;

const NoteText = styled.Text`
  font-size: 14px;
  color: ${Colours.purple[7]};
  font-family: Manrope_400Regular;
  line-height: 20px;
`;
