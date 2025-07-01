import CustomIcon from "@/app/components/ui/CustomIcon";
import { NOTIFICATIONS_ICON } from "@/constants/icons";
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
          <NotificationIcon>
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
  align-items: center;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const Greeting = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
  font-family: Manrope_600SemiBold;
  margin-bottom: 4px;
`;

const MoodContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${Colours.purple[7]};
  padding: 8px 12px;
  width: 130px;
  border-radius: 4px;
  justify-content: center;
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
`;

const UpdateMoodButton = styled.TouchableOpacity`
  background-color: ${Colours.purple[7]};
  padding: 8px 16px;
  border-radius: 32px;
`;

const UpdateMoodText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: Manrope_600SemiBold;
`;

const NotificationButton = styled.TouchableOpacity`
  padding: 8px;
`;

const NotificationIcon = styled.Text`
  font-size: 20px;
`;

export default HeaderSection;
