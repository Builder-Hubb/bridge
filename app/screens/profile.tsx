import { Colours } from "@/constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import styled from "styled-components/native";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colours.green[0.5]};
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  background-color: ${Colours.green[0]};
`;

const BackButton = styled.Pressable`
  margin-right: 16px;
`;

const HeaderTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${Colours.black[0]};
`;

const Content = styled(View)`
  flex: 1;
  padding: 20px;
`;

const ProfileImageSection = styled(View)`
  align-items: center;
  margin-bottom: 32px;
`;

const ProfileImageContainer = styled(View)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${Colours.green[3]};
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ChangePhotoButton = styled.Pressable`
  background-color: ${Colours.green[6]};
  padding: 8px 16px;
  border-radius: 20px;
`;

const ChangePhotoText = styled(Text)`
  color: ${Colours.green[0]};
  font-size: 14px;
  font-weight: 500;
`;

const FormSection = styled(View)`
  gap: 20px;
`;

const InputGroup = styled(View)`
  gap: 8px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${Colours.black[0]};
`;

const StyledTextInput = styled(TextInput)`
  background-color: ${Colours.green[0]};
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: ${Colours.black[0]};
  border: 1px solid ${Colours.green[2]};
`;

const SaveButton = styled.Pressable`
  background-color: ${Colours.green[6]};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 32px;
`;

const SaveButtonText = styled(Text)`
  color: ${Colours.green[0]};
  font-size: 16px;
  font-weight: 600;
`;

const InfoCard = styled(View)`
  background-color: ${Colours.green[0]};
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
  border-left-width: 4px;
  border-left-color: ${Colours.blue[1]};
`;

const InfoText = styled(Text)`
  font-size: 14px;
  color: ${Colours.black[2]};
  line-height: 20px;
`;

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [bio, setBio] = useState("Living my best life, one day at a time.");

  const handleBackPress = () => {
    router.back();
  };

  const handleChangePhoto = () => {
    Alert.alert(
      "Change Photo",
      "Photo selection functionality would be implemented here"
    );
  };

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile has been successfully updated!"
    );
    // Add save logic here
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.green[0]} />

      <Header>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color={Colours.black[0]} />
        </BackButton>
        <HeaderTitle>Profile</HeaderTitle>
      </Header>

      <Content>
        <ProfileImageSection>
          <ProfileImageContainer>
            <Ionicons name="person" size={60} color={Colours.green[0]} />
          </ProfileImageContainer>
          <ChangePhotoButton onPress={handleChangePhoto}>
            <ChangePhotoText>Change Photo</ChangePhotoText>
          </ChangePhotoButton>
        </ProfileImageSection>

        <FormSection>
          <InputGroup>
            <Label>Full Name</Label>
            <StyledTextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={Colours.black[2]}
            />
          </InputGroup>

          <InputGroup>
            <Label>Email Address</Label>
            <StyledTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={Colours.black[2]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </InputGroup>

          <InputGroup>
            <Label>Bio</Label>
            <StyledTextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              placeholderTextColor={Colours.black[2]}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </InputGroup>
        </FormSection>

        <SaveButton onPress={handleSave}>
          <SaveButtonText>Save Changes</SaveButtonText>
        </SaveButton>

        <InfoCard>
          <InfoText>
            Your profile information helps personalize your experience. This
            data is kept secure and private.
          </InfoText>
        </InfoCard>
      </Content>
    </Container>
  );
}
