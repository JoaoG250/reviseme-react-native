import { Text } from "react-native";
import { SubjectTabScreenProps } from "../../types";

export default function SubjectTopicTabScreen({
  route,
}: SubjectTabScreenProps<"SubjectTopicTab">) {
  return <Text>SubjectTopicTabScreen - Id {route.params.subjectId}</Text>;
}
