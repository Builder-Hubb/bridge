import { Colours } from "@/constants/Colours";
import {
  ANALYTICS_ICON,
  HOME_ICON,
  MESSAGES_ICON,
  SETTINGS_ICON,
} from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import HapticTab from "../components/HapticTab";
import CustomIcon from "../components/ui/CustomIcon";
import TabBarBackground from "../components/ui/TabBarBackground";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colours.purple[8.5],
        tabBarInactiveTintColor: Colours.purple[7],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: Colours.purple[1],
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
            height: Platform.OS === "ios" ? 100 : 90,
          },
          default: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: Colours.purple[1],
            paddingBottom: 10,
            height: 90,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "500",
          fontFamily: "Manrope_600SemiBold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              svgString={HOME_ICON}
              size={24}
              color={focused ? Colours.purple[8.5] : Colours.purple[7]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              svgString={MESSAGES_ICON}
              size={24}
              color={focused ? Colours.purple[8.5] : Colours.purple[7]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              svgString={ANALYTICS_ICON}
              size={24}
              color={focused ? Colours.purple[8.5] : Colours.purple[7]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              svgString={SETTINGS_ICON}
              size={24}
              color={focused ? Colours.purple[8.5] : Colours.purple[7]}
            />
          ),
        }}
      />
    </Tabs>
  );
}
