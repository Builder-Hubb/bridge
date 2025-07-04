import { Colours } from "@/constants/Colours";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";

interface AvatarUploaderProps {
  currentAvatar?: string | number;
  onAvatarChange: (avatarUri: string) => void;
  isEditable: boolean;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  currentAvatar,
  onAvatarChange,
  isEditable,
}) => {
  const [previewUri, setPreviewUri] = useState<string | undefined>(
    typeof currentAvatar === "number" ? currentAvatar.toString() : currentAvatar
  );

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to upload photos."
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Alert.alert("Select Photo", "Choose how you would like to select a photo", [
      {
        text: "Camera Roll",
        onPress: () => launchImagePicker("library"),
      },
      {
        text: "Camera",
        onPress: () => launchImagePicker("camera"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const launchImagePicker = async (source: "library" | "camera") => {
    try {
      let result;

      if (source === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Camera permission is required to take photos."
          );
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setPreviewUri(imageUri);
        onAvatarChange(imageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const renderDefaultAvatar = () => (
    <DefaultAvatarContainer>
      <DefaultAvatarText>👤</DefaultAvatarText>
    </DefaultAvatarContainer>
  );

  return (
    <AvatarContainer>
      <AvatarWrapper
        onPress={isEditable ? pickImage : undefined}
        disabled={!isEditable}
      >
        {previewUri ? (
          <AvatarImage source={{ uri: previewUri }} />
        ) : currentAvatar ? (
          <AvatarImage
            source={
              typeof currentAvatar === "string"
                ? { uri: currentAvatar }
                : currentAvatar
            }
          />
        ) : (
          renderDefaultAvatar()
        )}

        {isEditable && (
          <EditOverlay>
            <EditIcon>📷</EditIcon>
          </EditOverlay>
        )}
      </AvatarWrapper>
    </AvatarContainer>
  );
};

export default AvatarUploader;

const AvatarContainer = styled.View`
  align-items: center;
  margin-bottom: 8px;
`;

const AvatarWrapper = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  background-color: ${Colours.purple[1]};
  border: 3px solid ${Colours.purple[2]};
`;

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

const DefaultAvatarContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${Colours.purple[2]};
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const DefaultAvatarText = styled.Text`
  font-size: 40px;
  color: ${Colours.purple[6]};
`;

const EditOverlay = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: ${Colours.purple[8.5]};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${Colours.green[0]};
`;

const EditIcon = styled.Text`
  font-size: 16px;
  color: ${Colours.green[0]};
`;
