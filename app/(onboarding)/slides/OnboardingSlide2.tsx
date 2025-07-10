import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../components/typography";

export default function OnboardingSlide2() {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 320, height: 320, marginBottom: 24 }}
        source={require("@/assets/images/onboarding/onboard-two.svg")}
        contentFit="contain"
      />
      <Typography variant="h2" style={styles.text}>
        We&apos;ll remind you with kindness.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text: { textAlign: "center", marginTop: 16 },
});
