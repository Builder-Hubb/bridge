import Button from "@/components/Button";
import Calendar from "@/components/analytics/Calendar";
import EmotionalAnalytics from "@/components/analytics/EmotionalAnalytics";
import MetricCard from "@/components/analytics/MetricCard";
import ReflectionModal from "@/components/analytics/ReflectionModal";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

const Analytics = () => {
  const [showReflectionModal, setShowReflectionModal] = useState(false);

  const emotionalTags = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😕", label: "Confused" },
    { emoji: "🎉", label: "Excited" },
  ];

  const getCurrentWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (date: Date) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
      };

      return `${month} ${getOrdinal(day)}, ${year}`;
    };

    return `${formatDate(monday)} - ${formatDate(sunday)}`;
  };

  const handleReflection = (reflection: string) => {};

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <HeaderTitle>Your Week in Review</HeaderTitle>
            <HeaderSubtitle>{getCurrentWeek()}</HeaderSubtitle>
          </Header>

          <MetricCard
            icon="👍"
            title="Replies Made"
            value={30}
            change="15+ from previous week"
            changeType="increase"
            iconColor="#EBE7F1"
          />

          <MetricCard
            icon="💤"
            title="Conversations Snoozed"
            value={6}
            change="3+ from previous week"
            changeType="increase"
            iconColor="#EBE7F1"
          />

          <MetricCard
            icon="⏳"
            title="Pending Messages"
            value={8}
            change="4+ from previous weeks"
            changeType="increase"
            iconColor="#EBE7F1"
          />

          <EmotionalAnalytics
            tags={emotionalTags}
            moodDescription="Your mood for this week: Calm and positive week, agitated on Tuesday and tensed on Friday"
          />

          <Calendar />

          <ReflectionSection>
            <ReflectionTitle>
              How did you feel connecting this week?
            </ReflectionTitle>
            <Button
              label="Reflect & Journal"
              onPress={() => setShowReflectionModal(true)}
            />
          </ReflectionSection>
        </ScrollView>

        <ReflectionModal
          visible={showReflectionModal}
          onClose={() => setShowReflectionModal(false)}
          onSave={handleReflection}
        />
      </Container>
    </>
  );
};

export default Analytics;

const Container = styled.View`
  flex: 1;
  background-color: #f7f8fe;
  padding: 20px;
  padding-top: 80px;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const HeaderSubtitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #1c1c1c;
`;

const ReflectionSection = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ReflectionTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: #1c1c1c;
  margin-bottom: 16px;
  text-align: center;
`;
