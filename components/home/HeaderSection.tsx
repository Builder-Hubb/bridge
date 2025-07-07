import CustomIcon from "@/app/components/ui/CustomIcon";
import { NOTIFICATIONS_ICON } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import styled from "styled-components/native";
import { Colours } from "../../constants/Colours";
import { UserProfile } from "../../types";

interface HeaderSectionProps {
  userProfile: UserProfile;
  onUpdateMood: () => void;
  onNotificationPress: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  userProfile,
  onUpdateMood,
  onNotificationPress,
}) => {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push("/screens/notification");
  };
  return (
    <HeaderContainer>
      <UserInfo>
        <Greeting>Hello {userProfile.name}</Greeting>
        <MoodContainer>
          <MoodText>
            Feeling {userProfile.currentMood} {userProfile.moodEmoji}
          </MoodText>
        </MoodContainer>
      </UserInfo>
      <HeaderActions>
        <UpdateMoodButton onPress={onUpdateMood}>
          <UpdateMoodText>Update Mood</UpdateMoodText>
        </UpdateMoodButton>
        <NotificationButton onPress={onNotificationPress}>
          <NotificationIcon onPress={handleNotificationPress}>
            <CustomIcon
              svgString={NOTIFICATIONS_ICON}
              size={24}
              color={Colours.purple[0]}
            />
          </NotificationIcon>
        </NotificationButton>
      </HeaderActions>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  background-color: ${Colours.purple[8.5]};
  padding: 24px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const Greeting = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
  font-family: Manrope_600SemiBold;
  margin-bottom: 8px;
`;

const MoodContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${Colours.purple[7]};
  padding: 8px 12px;
  width: 170px;
  border-radius: 4px;
  justify-content: flex-start;
`;

const MoodText = styled.Text`
  font-size: 16px;
  color: white;
  font-family: Manrope_400Regular;
  opacity: 0.9;
`;

const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const UpdateMoodButton = styled.TouchableOpacity`
  background-color: ${Colours.purple[7]};
  padding: 12px 20px;
  border-radius: 32px;
  margin-top: 26px;
`;

const UpdateMoodText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: Manrope_600SemiBold;
`;

const NotificationButton = styled.TouchableOpacity`
  padding: 8px;
  margin-top: 28px;
`;

const NotificationIcon = styled.Text`
  font-size: 20px;
`;

export default HeaderSection;
