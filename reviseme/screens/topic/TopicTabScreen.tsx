import { Text, View } from "react-native";
import { useTopic } from "../../contexts/topic";

export default function TopicTabScreen() {
  const { topic } = useTopic();

  return (
    <View>
      <Text>TopicTabScreen</Text>
      <Text>{topic?.id}</Text>
      <Text>{topic?.name}</Text>
    </View>
  );
}
