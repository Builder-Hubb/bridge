import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../components/typography";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

export default function OnboardingSlide3() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 320, height: 320, marginBottom: 24 }}
        source={require("@/assets/images/onboarding/onboard-three.svg")}
        contentFit="contain"
      />
      <Typography variant="h2" style={styles.text}>
        Ready to connect again?
      </Typography>

      <Button
        width="full"
        borderRadius="curved"
        size="lg"
        label="Get Started"
        onPress={handleNavigate}
      />
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
  text: { textAlign: "center", marginVertical: 32 },
});
