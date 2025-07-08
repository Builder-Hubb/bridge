import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Colours } from "@/constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import OnboardingSlide1 from "./OnboardingSlide1";
import OnboardingSlide2 from "./OnboardingSlide2";
import OnboardingSlide3 from "./OnboardingSlide3";
import Typography from "@/app/components/typography";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  { key: "1", component: <OnboardingSlide1 /> },
  { key: "2", component: <OnboardingSlide2 /> },
  { key: "3", component: <OnboardingSlide3 /> },
];

function AnimatedIndicator({ active }: { active: boolean }) {
  const animatedWidth = useRef(new Animated.Value(active ? 32 : 10)).current;
  const animatedColor = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: active ? 32 : 10,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedColor, {
      toValue: active ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [active, animatedWidth, animatedColor]);

  const backgroundColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e0e0e0", Colours.purple[8]],
  });

  return (
    <Animated.View
      style={{
        width: animatedWidth,
        height: 10,
        borderRadius: 5,
        backgroundColor,
        marginHorizontal: 4,
      }}
    />
  );
}

export default function StartDisplay() {
  const router = useRouter();
  const [current, setCurrent] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrent(slideIndex);
  };

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index });
    setCurrent(index);
  };

  const handleBack = () => {
    if (current > 0) {
      goToSlide(current - 1);
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {current > 0 ? (
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtn} />
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => (
          <View style={{ width }}>{item?.component}</View>
        )}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        extraData={current}
      />

      <IndicatorView style={styles.indicatorView}>
        {current < slides.length - 1 ? (
          <TouchableOpacity onPress={handleSkip}>
            <Typography variant="body" style={{ color: Colours.purple[9] }}>
              Skip
            </Typography>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}

        <View style={styles.indicatorRow}>
          {slides.map((_, idx) => (
            <AnimatedIndicator key={idx} active={current === idx} />
          ))}
        </View>
      </IndicatorView>
    </View>
  );
}

const IndicatorView = styled.View`
  width: ${width};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorView: { paddingHorizontal: 24 },
  indicatorRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 32,
    backgroundColor: Colours.purple[8],
    borderRadius: 5,
  },
  bottomBar: { marginHorizontal: 16, marginBottom: 32 },
});
