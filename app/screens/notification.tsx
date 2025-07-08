import { Colours } from "@/constants/Colours";
import { mockNotifications } from "@/constants/mockData";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar } from "react-native";
import styled from "styled-components/native";
import {
  NotificationItem,
  NotificationItemProps,
} from "../../components/notifications/NotificationItem";

type TabType = "All" | "Nudges" | "Notifications";

export interface NotificationData
  extends Omit<NotificationItemProps, "onReply" | "onPress"> {
  type: "nudge" | "notification";
}

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [loading, setLoading] = useState(false);

  const tabs: TabType[] = ["All", "Nudges", "Notifications"];

  const route = useRouter();

  const filteredNotifications = useMemo(() => {
    if (activeTab === "All") {
      return mockNotifications;
    }
    return mockNotifications.filter((notification) =>
      activeTab === "Nudges"
        ? notification.type === "nudge"
        : notification.type === "notification"
    );
  }, [activeTab]);

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleBackPress = () => {
    route.back();
  };

  if (loading) {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <LoadingContainer>
          <ActivityIndicator size="large" color="#2d1b69" />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Header>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={Colours.purple[8.5]} />
        </BackButton>
        <HeaderContent>
          <Title>Notifications</Title>
        </HeaderContent>
      </Header>

      <TabContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <TabText active={activeTab === tab}>{tab}</TabText>
          </Tab>
        ))}
      </TabContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <EmptyContainer>
            <EmptyText>No {activeTab.toLowerCase()} found</EmptyText>
          </EmptyContainer>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))
        )}
      </ScrollView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 20px;
  background-color: #f5f5f7;
`;

const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  justify-content: center;
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
`;

const TabContainer = styled.View`
  flex-direction: row;
  padding: 16px;
`;

const Tab = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#B5D3D8" : "transparent")};
  border-radius: 20px;
  padding: 8px 16px;
  margin-right: 8px;
  min-width: 80px;
  align-items: center;
  border: 2px solid #b5d3d8;
`;

const TabText = styled.Text<{ active: boolean }>`
  color: ${(props) => (props.active ? "#ffffff" : "#6c757d")};
  font-size: 14px;
  font-weight: 600;
  font-family: Manrope_600SemiBold;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;

  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #666666;
  text-align: center;
`;
