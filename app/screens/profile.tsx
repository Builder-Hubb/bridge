import Button from "@/components/Button";
import AvatarUploader from "@/components/profile/AvatarUploader";
import { Colours } from "@/constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";

interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  avatar?: string | number;
}

const mockApiSave = async (
  data: ProfileData
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const success = Math.random() > 0.2;

  return {
    success,
    message: success
      ? "Profile updated successfully!"
      : "Failed to update profile. Please try again.",
  };
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Sarah Johnson",
    username: "@sarahj",
    email: "sarah.johnson@example.com",
    phoneNumber: "+1 (555) 123-4567",
    avatar: require("../../assets/images/avatar.png"),
  });

  const [formData, setFormData] = useState<ProfileData>(profileData);
  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  const handleEdit = () => {
    setFormData(profileData);
    setErrors({});
    setIsEditing(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!formData.username.startsWith("@")) {
      newErrors.username = "Username must start with @";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await mockApiSave(formData);

      if (result.success) {
        setProfileData(formData);
        setIsEditing(false);
        Alert.alert("Success", result.message);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (avatarUri: string) => {
    if (isEditing) {
      setFormData((prev) => ({ ...prev, avatar: avatarUri }));
    }
  };

  const updateFormField = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Container>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <BackButton>
              <BackButton>
                <Ionicons
                  name="arrow-back"
                  size={16}
                  color={Colours.green[7]}
                />
              </BackButton>
            </BackButton>
            <HeaderTitle>Profile</HeaderTitle>
            <Spacer />
          </Header>

          <AvatarUploader
            currentAvatar={isEditing ? formData.avatar : profileData.avatar}
            onAvatarChange={handleAvatarChange}
            isEditable={isEditing}
          />

          <ProfileCard>
            <FormSection>
              <SectionTitle>Personal Information</SectionTitle>

              <InputGroup>
                <InputLabel>Full Name</InputLabel>
                {isEditing ? (
                  <>
                    <StyledInput
                      value={formData.fullName}
                      onChangeText={(text) => updateFormField("fullName", text)}
                      placeholder="Enter your full name"
                      hasError={!!errors.fullName}
                    />
                    {errors.fullName && (
                      <ErrorText>{errors.fullName}</ErrorText>
                    )}
                  </>
                ) : (
                  <DisplayText>{profileData.fullName}</DisplayText>
                )}
              </InputGroup>

              <InputGroup>
                <InputLabel>Username</InputLabel>
                {isEditing ? (
                  <>
                    <StyledInput
                      value={formData.username}
                      onChangeText={(text) => updateFormField("username", text)}
                      placeholder="@username"
                      hasError={!!errors.username}
                    />
                    {errors.username && (
                      <ErrorText>{errors.username}</ErrorText>
                    )}
                  </>
                ) : (
                  <DisplayText>{profileData.username}</DisplayText>
                )}
              </InputGroup>

              <InputGroup>
                <InputLabel>Email Address</InputLabel>
                {isEditing ? (
                  <>
                    <StyledInput
                      value={formData.email}
                      onChangeText={(text) => updateFormField("email", text)}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      hasError={!!errors.email}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </>
                ) : (
                  <DisplayText>{profileData.email}</DisplayText>
                )}
              </InputGroup>

              <InputGroup>
                <InputLabel>Phone Number</InputLabel>
                {isEditing ? (
                  <>
                    <StyledInput
                      value={formData.phoneNumber}
                      onChangeText={(text) =>
                        updateFormField("phoneNumber", text)
                      }
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      hasError={!!errors.phoneNumber}
                    />
                    {errors.phoneNumber && (
                      <ErrorText>{errors.phoneNumber}</ErrorText>
                    )}
                  </>
                ) : (
                  <DisplayText>{profileData.phoneNumber}</DisplayText>
                )}
              </InputGroup>
            </FormSection>

            <ButtonContainer>
              <Button
                label={isEditing ? "Save" : "Edit"}
                onPress={isEditing ? handleSave : handleEdit}
                loading={isLoading}
                variant="primary"
              />
            </ButtonContainer>
          </ProfileCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${Colours.green[0]};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  padding-top: 60px;
`;

const BackButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Colours.purple[8.5]};
  font-family: semibold;
`;

const Spacer = styled.View`
  width: 32px;
`;

const ProfileCard = styled.View`
  margin: 20px;
  background-color: #f5f5f7;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid #cacaca;
`;

const FormSection = styled.View`
  margin-top: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Colours.purple[8.5]};
  margin-bottom: 20px;
  font-family: Manrope_600SemiBold;
`;

const InputGroup = styled.View`
  margin-bottom: 20px;
`;

const InputLabel = styled.Text`
  font-size: 16px;
  color: ${Colours.purple[7]};
  margin-bottom: 8px;
  font-weight: 500;
  font-family: Manrope_500SemiBold;
`;

const StyledInput = styled.TextInput<{ hasError?: boolean }>`
  border: 1px solid
    ${({ hasError }) => (hasError ? Colours.red[1] : Colours.green[3.5])};
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  color: ${Colours.purple[7]};
  background-color: ${Colours.green[0]};
  font-family: Manrope_400SemiBold;
`;

const DisplayText = styled.Text`
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  color: ${Colours.purple[7]};
  background-color: ${Colours.green[0]};
  font-family: Manrope_400SemiBold;
  border: 1px solid ${Colours.green[3.5]};
  border-radius: 10px;
`;

const ErrorText = styled.Text`
  color: ${Colours.red[1]};
  font-size: 12px;
  margin-top: 4px;
  font-family: semibold;
`;

const ButtonContainer = styled.View`
  margin-top: 24px;
`;
