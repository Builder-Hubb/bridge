import React from "react";
import { Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Colours } from "@/constants/Colours";
import FormInput from "@/components/form/FormInput";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Container } from "@/layout/container";

export default function SignUpScreen() {
  const router = useRouter();

  const handleOnPress = () => {
    router.push("/(auth)/verify-email");
  };

  return (
    <Container>
      <Text style={styles.lgText}>Sign Up</Text>
      <MainDisplay>
        <FormInput type="text" placeholder="Username" />

        <FormInput type="email" placeholder="Email" />

        <Button
          label="Sign Up"
          width="full"
          borderRadius="curved"
          onPress={handleOnPress}
        />
      </MainDisplay>
    </Container>
  );
}

const MainDisplay = styled.View`
  width: 100%;
  max-width: 90%;
  margin: 24px auto;
`;

const styles = StyleSheet.create({
  lgText: {
    fontSize: 32,
    fontWeight: 600,
    color: Colours.purple[8],
    textAlign: "left",
  },
});
