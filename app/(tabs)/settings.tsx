import LogoutCard from "@/components/settings/LogoutCard";
import SettingCard from "@/components/settings/SettingCard";
import { Colours } from "@/constants/Colours";
import {
  CHART_ICON,
  LINK_ICON,
  NOTIFICATIONS_ICON,
  TAG_ICON,
} from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import styled from "styled-components/native";

export default function SettingsScreen() {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push("/screens/profile");
  };

  const handleMoodHistoryPress = () => {
    router.push("/screens/moodHistory");
  };

  const handleSettingPress = (setting: string) => {};

  const handleLogout = () => {};

  const handleBackPress = () => {
    router.back();
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.green[0]} />

      <Header>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color={Colours.black[0]} />
        </BackButton>
        <HeaderTitle>Settings</HeaderTitle>
      </Header>

      <Content>
        <ProfileCard onPress={handleProfilePress}>
          <ProfileImage>
            <Ionicons name="person" size={24} color={Colours.green[0]} />
          </ProfileImage>
          <ProfileContent>
            <ProfileTitle>Profile</ProfileTitle>
            <ProfileSubtitle>View and manage your profile</ProfileSubtitle>
          </ProfileContent>
          <ArrowIcon name="chevron-forward" size={20} />
        </ProfileCard>

        <SettingsSection>
          <SettingCard
            icon={LINK_ICON}
            title="Manage Linked Apps"
            subtitle="Connect applications to help stay in check"
            onPress={() => handleSettingPress("Linked Apps")}
          />

          <SettingCard
            icon={NOTIFICATIONS_ICON}
            title="Reminder Frequency"
            subtitle="Select how often you would like to receive notifications and reminders"
            onPress={() => handleSettingPress("Reminder Frequency")}
          />

          <SettingCard
            icon={TAG_ICON}
            title="Emotional Tags"
            subtitle="View tag library and customize your emotion tags"
            onPress={() => handleSettingPress("Emotional Tags")}
          />

          <SettingCard
            icon={CHART_ICON}
            title="Mood History"
            subtitle="View insights on your mood was from time to time"
            onPress={handleMoodHistoryPress}
          />

          <LogoutCard onPress={handleLogout} />
        </SettingsSection>
      </Content>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colours.green[0]};
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  background-color: ${Colours.green[0]};
  margin-top: ${StatusBar.currentHeight}px;
`;

const BackButton = styled.Pressable`
  margin-right: 16px;
`;

const HeaderTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${Colours.black[0]};
  text-align: center;
`;

const Content = styled(View)`
  flex: 1;
  padding: 20px;
`;

const ProfileCard = styled.Pressable`
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${Colours.green[3.5]};
`;

const ProfileImage = styled(View)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${Colours.green[3]};
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

const ProfileContent = styled(View)`
  flex: 1;
  color: #1c1c1c;
`;

const ProfileTitle = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ProfileSubtitle = styled(Text)`
  font-size: 14px;
  color: ${Colours.black[2]};
  font-weight: 500;
`;

const ArrowIcon = styled(Ionicons)`
  color: ${Colours.black[2]};
`;

const SettingsSection = styled(View)`
  gap: 12px;
`;
