import MoodInsights from "@/components/moodHistory/MoodInsights";
import MoodOverviewCard from "@/components/moodHistory/MoodOverviewCard";
import RecentMoodsList from "@/components/moodHistory/RecentMoodsList";
import WeeklyMoodChart from "@/components/moodHistory/WeeklyMoodChart";
import { Colours } from "@/constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";

interface MoodEntry {
  id: string;
  tag: string;
  score: number;
  timestamp: Date;
  note?: string;
  color: string;
}

interface WeeklyMoodData {
  day: string;
  mood: number;
  date: string;
}

interface MoodStats {
  overallMood: number;
  averageMonthlyMood: number;
  tagsUsed: number;
  weeklyAverage: number;
  percentageChange: number;
}

interface MoodInsight {
  id: string;
  title: string;
  description: string;
  type: "pattern" | "improvement" | "concern";
}
const mockMoodEntries: MoodEntry[] = [
  {
    id: "1",
    tag: "Happy",
    score: 9,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    note: "I was happy to see my friends last week. Haven't seen them in a while.",
    color: Colours.yellow[1],
  },
  {
    id: "2",
    tag: "Sad",
    score: 3,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    note: "I wasn't able to order chickwizz from chicken republic.",
    color: Colours.blue[1],
  },
  {
    id: "3",
    tag: "Overwhelmed",
    score: 4,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    note: "I had so much work to get done within a short period of time.",
    color: Colours.red[1],
  },
  {
    id: "4",
    tag: "Anxious",
    score: 4,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    note: "Feeling overwhelmed and exhausted and I just need a vacation.",
    color: Colours.purple[6],
  },
  {
    id: "5",
    tag: "Confused",
    score: 5,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    note: "Feeling overwhelmed and exhausted and I just need a vacation.",
    color: Colours.purple[4],
  },
  {
    id: "6",
    tag: "Calm",
    score: 8,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    note: "Feeling overwhelmed and exhausted and I just need a vacation.",
    color: Colours.green[5],
  },
  {
    id: "7",
    tag: "Tired",
    score: 4,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    note: "Feeling overwhelmed and exhausted and I just need a vacation.",
    color: Colours.purple[7],
  },
];

const mockWeeklyData: WeeklyMoodData[] = [
  { day: "Mon", mood: 7, date: "2024-01-01" },
  { day: "Tue", mood: 5, date: "2024-01-02" },
  { day: "Wed", mood: 6, date: "2024-01-03" },
  { day: "Thurs", mood: 4, date: "2024-01-04" },
  { day: "Fri", mood: 8, date: "2024-01-05" },
  { day: "Sat", mood: 9, date: "2024-01-06" },
  { day: "Sun", mood: 7, date: "2024-01-07" },
];

const mockInsights: MoodInsight[] = [
  {
    id: "1",
    title: "Mood Pattern Detection",
    description:
      "Your mood fluctuates and tends to change on weekends. This is based on the recurring activities. Hoping for a better mood next week!",
    type: "pattern",
  },
];

const MoodHistoryScreen: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodEntries);
  const [weeklyData, setWeeklyData] =
    useState<WeeklyMoodData[]>(mockWeeklyData);
  const [insights, setInsights] = useState<MoodInsight[]>(mockInsights);
  const [refreshing, setRefreshing] = useState(false);
  const [moodStats, setMoodStats] = useState<MoodStats>({
    overallMood: 50,
    averageMonthlyMood: 25,
    tagsUsed: 8,
    weeklyAverage: 9.5,
    percentageChange: 12,
  });
  const route = useRouter();

  const calculateMoodFrequency = () => {
    const frequency: { [key: string]: { count: number; color: string } } = {};

    moodEntries.forEach((entry) => {
      if (frequency[entry.tag]) {
        frequency[entry.tag].count++;
      } else {
        frequency[entry.tag] = { count: 1, color: entry.color };
      }
    });

    return frequency;
  };

  const generateInsights = () => {
    const weekendMoods = weeklyData.filter(
      (d) => d.day === "Sat" || d.day === "Sun"
    );
    const weekdayMoods = weeklyData.filter(
      (d) => d.day !== "Sat" && d.day !== "Sun"
    );

    const weekendAvg =
      weekendMoods.reduce((sum, d) => sum + d.mood, 0) / weekendMoods.length;
    const weekdayAvg =
      weekdayMoods.reduce((sum, d) => sum + d.mood, 0) / weekdayMoods.length;

    if (Math.abs(weekendAvg - weekdayAvg) > 2) {
      return [
        {
          id: "weekend-pattern",
          title: "Weekend Mood Pattern",
          description: `Your mood ${weekendAvg > weekdayAvg ? "improves" : "dips"} significantly on weekends. Consider what activities or factors contribute to this pattern.`,
          type: "pattern" as const,
          icon: weekendAvg > weekdayAvg ? "📈" : "📉",
        },
      ];
    }

    return mockInsights;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newInsights = generateInsights();
    setInsights(newInsights);

    setRefreshing(false);
  };

  const handleBackPress = () => {
    route.back();
  };

  useEffect(() => {
    const newInsights = generateInsights();
    setInsights(newInsights);
  }, [weeklyData, moodEntries]);

  return (
    <Container>
      <StatusBar style="dark" />

      <Header>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={Colours.purple[8.5]} />
        </BackButton>
        <HeaderContent>
          <HeaderTitle>Mood History</HeaderTitle>
          <HeaderSubtitle>Track your emotional journey</HeaderSubtitle>
        </HeaderContent>
        <Spacer />
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThisWeekCard>
          <LinearGradient
            colors={["#7D63A2", Colours.green[3.5]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 20,
            }}
          >
            <CardHeader>
              <CardTitle>This Week</CardTitle>
              <TrendIcon>
                <SvgXml
                  xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 22.75H5C2.93 22.75 1.25 21.07 1.25 19V2C1.25 1.59 1.59 1.25 2 1.25C2.41 1.25 2.75 1.59 2.75 2V19C2.75 20.24 3.76 21.25 5 21.25H22C22.41 21.25 22.75 21.59 22.75 22C22.75 22.41 22.41 22.75 22 22.75Z" fill="white"/>
<path d="M4.99982 17.7501C4.82982 17.7501 4.64982 17.6901 4.50982 17.5701C4.19982 17.3001 4.15982 16.8301 4.42982 16.5101L9.01982 11.1501C9.51982 10.5701 10.2398 10.2201 10.9998 10.1901C11.7598 10.1701 12.5098 10.4501 13.0498 10.9901L13.9998 11.9401C14.2498 12.1901 14.5798 12.3101 14.9298 12.3101C15.2798 12.3001 15.5998 12.1401 15.8298 11.8701L20.4198 6.51008C20.6898 6.20008 21.1598 6.16006 21.4798 6.43006C21.7898 6.70006 21.8298 7.17006 21.5598 7.49006L16.9698 12.8501C16.4698 13.4301 15.7498 13.7801 14.9898 13.8101C14.2298 13.8301 13.4798 13.5501 12.9398 13.0101L11.9998 12.0601C11.7498 11.8101 11.4198 11.6801 11.0698 11.6901C10.7198 11.7001 10.3998 11.8601 10.1698 12.1301L5.57982 17.4901C5.41982 17.6601 5.20982 17.7501 4.99982 17.7501Z" fill="white"/>
</svg>`}
                  width={24}
                  height={24}
                />
              </TrendIcon>
            </CardHeader>
            <MoodContainer>
              <MoodScore>{moodStats.weeklyAverage}</MoodScore>
              <MoodLabel>avg mood</MoodLabel>
            </MoodContainer>

            <ChangeText positive={moodStats.percentageChange > 0}>
              {moodStats.percentageChange > 0 ? "+" : ""}
              {moodStats.percentageChange}% increase within the last 2 weeks
            </ChangeText>
          </LinearGradient>
        </ThisWeekCard>

        <WeeklyMoodChart data={weeklyData} />

        <SectionTitle>Mood Overview</SectionTitle>
        <MoodOverviewCard stats={moodStats} />

        <SectionTitle>Recents</SectionTitle>
        <RecentMoodsList
          entries={moodEntries}
          frequency={calculateMoodFrequency()}
        />

        <SectionTitle>Insights</SectionTitle>
        <MoodInsights insights={insights} />

        <BottomSpacer />
      </ScrollView>
    </Container>
  );
};

export default MoodHistoryScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${Colours.green[0]};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  padding-top: 60px;
`;

const BackButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.View`
  flex: 1;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Colours.purple[8.5]};
  font-family: Manrope_600SemiBold;
`;

const HeaderSubtitle = styled.Text`
  font-size: 14px;
  color: ${Colours.purple[6]};
  font-family: Manrope_500Regular;
  margin-top: 2px;
`;

const Spacer = styled.View`
  width: 32px;
`;

const ThisWeekCard = styled.View`
  margin: 20px;
  border-radius: 20px;
  shadow-color: ${Colours.purple[8.5]};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 5;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: ${Colours.green[0]};
  font-family: Manrope_800ExtraBold;
`;

const TrendIcon = styled.Text`
  font-size: 20px;
`;

const MoodContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 8px;
`;

const MoodScore = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${Colours.green[0]};
  font-family: Manrope_700Bold;
  margin-right: 8px;
`;

const MoodLabel = styled.Text`
  font-size: 14px;
  color: ${Colours.green[0]};
  font-family: Manrope_500Medium;
  opacity: 0.9;
`;

const ChangeText = styled.Text<{ positive: boolean }>`
  font-size: 14px;
  color: ${Colours.green[0]};
  font-family: Manrope_600SemiBold;
  opacity: 0.9;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Colours.purple[8.5]};
  font-family: Manrope_600SemiBold;
  margin: 24px 20px 16px 20px;
`;

const BottomSpacer = styled.View`
  height: 100px;
`;
