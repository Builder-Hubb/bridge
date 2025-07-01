import HeaderSection from "@/components/home/HeaderSection";
import MoodTrackingCard from "@/components/home/MoodTrackingCard";
import PendingMessagesCard from "@/components/home/PendingMessagesCard";
import ReflectionsCard from "@/components/home/ReflectionsCard";
import { Colours } from "@/constants/Colours";
import {
  hasPendingMessages,
  mockMoodData,
  mockReflections,
  mockUserProfile,
  pendingMessageText,
} from "@/constants/mockData";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();

  const handleUpdateMood = () => {
    // TODO: Navigate to mood update screen
  };

  const handleNotificationPress = () => {
    // TODO: Handle notification action
  };

  const handleViewMessage = () => {
    router.push("/(tabs)/messages");
  };

  const handleMaybeLater = () => {
    // TODO: Handle maybe later action (dismiss notification, etc.)
  };

  const handleAddReflection = () => {
    // TODO: Navigate to add reflection screen
  };

  const handleViewAllReflections = () => {
    // TODO: Navigate to reflections list screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colours.purple[0]} />

      <HeaderSection
        userProfile={mockUserProfile}
        onUpdateMood={handleUpdateMood}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hasPendingMessages && (
          <PendingMessagesCard
            messageText={pendingMessageText}
            onViewMessage={handleViewMessage}
            onMaybeLater={handleMaybeLater}
          />
        )}

        <ReflectionsCard
          reflections={mockReflections}
          onAddReflection={handleAddReflection}
          onViewAll={handleViewAllReflections}
        />

        <MoodTrackingCard
          moodData={mockMoodData}
          currentMood={mockUserProfile.currentMood}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.purple[0],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
