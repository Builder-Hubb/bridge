import Button from "@/components/Button";
import { Colours } from "@/constants/Colours";
import { Container } from "@/layout/container";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import Typography from "../components/typography";
import { useRouter } from "expo-router";

export default function DefaultDisplay() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/(onboarding)/slides/start");
  };

  return (
    <Container style={styles.container}>
      <Image
        style={{ width: 124, height: 124 }}
        source={require("@/assets/images/onboarding/bridge.svg")}
      />

      <Typography
        variant="h1"
        style={{
          color: Colours.purple[9],
        }}
      >
        Welcome to Bridge
      </Typography>

      <Typography variant="body" style={styles.paragraph}>
        Stay connected with the people who matter most, with gentle reminders
        that care.
      </Typography>

      <Button
        variant="primary"
        width="full"
        borderRadius="curved"
        size="lg"
        label="Get Started"
        onPress={handleNavigation}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: "center",
    paddingTop: 0,
    paddingHorizontal: 12,
  },
  paragraph: {
    textAlign: "center",
  },
});
