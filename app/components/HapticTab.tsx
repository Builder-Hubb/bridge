import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const HapticTab = (props: BottomTabBarButtonProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = (ev: any) => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(0.8, { duration: 50 });

    props.onPressIn?.(ev);
  };

  const handlePressOut = (ev: any) => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 200,
    });
    opacity.value = withTiming(1, { duration: 100 });

    props.onPressOut?.(ev);
  };

  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      <PlatformPressable
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          props.style,
          {
            borderRadius: 12,
            overflow: "hidden",
          },
        ]}
      />
    </Animated.View>
  );
};

export default HapticTab;
