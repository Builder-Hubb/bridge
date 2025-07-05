import { Colours } from "@/constants/Colours";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import { SvgXml } from "react-native-svg";
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
    typeof currentAvatar === "string" ? currentAvatar : undefined
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

  const getAvatarSource = () => {
    if (previewUri) {
      return { uri: previewUri };
    }

    if (typeof currentAvatar === "string") {
      return { uri: currentAvatar };
    }

    if (typeof currentAvatar === "number") {
      return currentAvatar;
    }
    return null;
  };

  return (
    <AvatarContainer>
      <AvatarWrapper
        onPress={isEditable ? pickImage : undefined}
        disabled={!isEditable}
      >
        {(() => {
          const source = getAvatarSource();
          if (source) {
            return <AvatarImage source={source} />;
          }
          return renderDefaultAvatar();
        })()}

        {isEditable && (
          <EditOverlay>
            <SvgXml
              xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#ffffff' d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>`}
              width={16}
              height={16}
            />
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
  z-index: 9999;
  bottom: 7px;
  right: -2px;
  width: 32px;
  height: 32px;
  background-color: ${Colours.purple[8.5]};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${Colours.green[0]};
  shadow-radius: 3.84px;
`;
