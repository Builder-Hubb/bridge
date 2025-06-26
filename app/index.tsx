import { Text, View } from "react-native";
import Button from "./components/Button";

export default function Index() {
  const handlePress = () => {};
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button label="Get Started" onPress={handlePress} loading={false} />
    </View>
  );
}
