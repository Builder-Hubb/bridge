import { Text, View } from "react-native";
import { router } from "expo-router";
import Button from "../components/Button";

export default function Index() {
  const handlePress = () => {
    router.push("/analytics");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button label="View Analytics" onPress={handlePress} loading={false} />
    </View>
  );
}
