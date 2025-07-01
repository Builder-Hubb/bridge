import CustomIcon from "@/app/components/ui/CustomIcon";
import { PLUS_ICON } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import { Colours } from "../../constants/Colours";
import { ReflectionEntry } from "../../types";

interface ReflectionsCardProps {
  reflections: ReflectionEntry[];
  onAddReflection: () => void;
  onViewAll: () => void;
}

const ReflectionsCard: React.FC<ReflectionsCardProps> = ({
  reflections,
  onAddReflection,
  onViewAll,
}) => {
  const router = useRouter();

  const handleViewMessage = () => {
    router.push("/(tabs)/messages");
  };

  const renderReflectionItem = ({ item }: { item: ReflectionEntry }) => (
    <ReflectionItem>
      <ReflectionTitle>{item.title}</ReflectionTitle>
      <ReflectionDate>{item.daysAgo} days ago</ReflectionDate>
    </ReflectionItem>
  );

  return (
    <Card>
      <Header>
        <ViewTextBlock>
          <Title>Reflections</Title>
          <Subtitle>Want to put those feelings in writing?</Subtitle>
        </ViewTextBlock>
        <AddButton onPress={handleViewMessage}>
          <AddButtonText>
            <Text>Add</Text>
            <CustomIcon
              svgString={PLUS_ICON}
              size={20}
              color={Colours.purple[8.5]}
            />
          </AddButtonText>
        </AddButton>
      </Header>

      <RecentHeader>
        <RecentTitle>Recent</RecentTitle>
        <ViewAllButton onPress={onViewAll}>
          <ViewAllText>View all</ViewAllText>
        </ViewAllButton>
      </RecentHeader>

      <FlatList
        data={reflections}
        renderItem={renderReflectionItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </Card>
  );
};

const Card = styled.View`
  background-color: white;
  padding: 30px;
  margin-top: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colours.purple[2]};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ViewTextBlock = styled.View``;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${Colours.purple[8]};
  font-family: Manrope_600SemiBold;
  margin-bottom: 4px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: ${Colours.purple[6]};
  font-family: Manrope_400Regular;
`;

const AddButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 20px;
  border-width: 1px;
  border: ${Colours.purple[8.5]};
`;

const AddButtonText = styled.Text`
  color: ${Colours.purple[8]};
  font-size: 20px;
  font-weight: 600;
  font-family: Manrope_600SemiBold;
`;

const RecentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const RecentTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Colours.purple[8]};
  font-family: Manrope_600SemiBold;
`;

const ViewAllButton = styled.TouchableOpacity``;

const ViewAllText = styled.Text`
  font-size: 16px;
  color: ${Colours.black[2]};
  font-family: Manrope_600Regular;
`;

const ReflectionItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colours.purple[0.5]};
`;

const ReflectionTitle = styled.Text`
  font-size: 16px;
  color: ${Colours.purple[8]};
  font-family: Manrope_400Regular;
`;

const ReflectionDate = styled.Text`
  font-size: 14px;
  color: ${Colours.purple[5]};
  font-family: Manrope_400Regular;
`;

export default ReflectionsCard;
