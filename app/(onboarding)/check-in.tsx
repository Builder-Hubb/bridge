import { Colours } from "@/constants/Colours";
import { mockMoodData, mockUserProfile } from "@/constants/mockData";
import { ContainerTop } from "@/layout/container";
import { MoodEntry } from "@/types";
import React from "react";
import { Dimensions, View } from "react-native";
import Typography from "../components/typography";
import CustomIcon from "../components/ui/CustomIcon";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("screen");

const TICK_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Helper to calculate streak (consecutive days from the end)
function getStreak(moodData: MoodEntry[]) {
  let streak = 0;
  for (let i = moodData.length - 1; i >= 0; i--) {
    if (moodData[i].mood) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// Helper to check if there is a break in the streak
function hasStreakBreak(moodData: MoodEntry[]) {
  // If any day before the last checked-in day is missing, it's a break
  let foundEmpty = false;
  for (let i = 0; i < moodData.length; i++) {
    if (!moodData[i].mood) foundEmpty = true;
    if (foundEmpty && moodData[i].mood) return true;
  }
  return false;
}

export default function CheckIn() {
  const router = useRouter();
  const moodData = mockMoodData;
  const user = mockUserProfile;
  const streak = getStreak(moodData);
  const streakBreak = hasStreakBreak(moodData);

  // Message logic
  let streakMsg = "";
  if (streakBreak) {
    streakMsg = "You missed a day, streak reset!";
  } else if (streak === 1) {
    streakMsg = "You're on a 1 day check-in streak";
  } else {
    streakMsg = `You're on a ${streak} day check-in streak`;
  }

  const moods = [
    "Happy 😊",
    "Calm 😎",
    "Anxious 😰",
    "Overwhelmed 😔",
    "Tired 😫",
  ];

  const handleMoodClick = () => {
    router.push("/(tabs)");
  };

  return (
    <ContainerTop>
      <View
        style={{
          width: width,
          paddingTop: 60,
          paddingHorizontal: 20,
          backgroundColor: Colours.purple[9],
        }}
      >
        <Typography variant="h2" style={{ color: "#fff" }}>
          Hi {user.name},
        </Typography>
        <Typography variant="body" style={{ color: "#fff" }}>
          Thanks for checking in!
        </Typography>

        <View style={{ paddingVertical: 20 }}>
          <Typography variant="body2" style={{ color: "#fff" }}>
            {streakMsg}
          </Typography>

          {/* Day labels */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              gap: 8,
              justifyContent: "space-between",
            }}
          >
            {moodData.map((entry, idx) => (
              <Typography
                key={entry.id}
                variant="caption"
                style={{ color: "#fff", width: 32, textAlign: "center" }}
              >
                {`Day ${idx + 1}`}
              </Typography>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 2,
              gap: 8,
              justifyContent: "space-between",
            }}
          >
            {moodData.map((entry, idx) => (
              <View
                key={entry.id || idx}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: entry.mood ? Colours.purple[9.5] : "#2B2236",

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {entry.mood && (
                  <CustomIcon svgString={TICK_SVG} size={20} color="#fff" />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <Typography variant="h2" fontWeight={200}>
          How are you feeling today?
        </Typography>

        <Typography
          variant="body"
          fontWeight={200}
          style={{ textAlign: "center", marginTop: 12 }}
        >
          Tap the mood that best describes how you&apos;re feeling
        </Typography>

        <View
          style={{
            marginVertical: 20,
            marginInline: 4,
          }}
        >
          {moods.map((item, idx) => (
            <View
              key={idx}
              style={{ marginBottom: idx !== moods.length - 1 ? 12 : 0 }}
            >
              <Button
                variant="accent"
                width="full"
                label={item}
                onPress={handleMoodClick}
              />
            </View>
          ))}
        </View>
      </View>
    </ContainerTop>
  );
}
