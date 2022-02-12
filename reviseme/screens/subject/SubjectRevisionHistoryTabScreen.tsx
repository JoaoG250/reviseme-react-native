import { Text } from "react-native";
import { SubjectTabScreenProps } from "../../types";

export default function SubjectRevisionHistoryTabScreen({
  route,
}: SubjectTabScreenProps<"SubjectRevisionHistoryTab">) {
  return (
    <Text>SubjectRevisionHistoryTabScreen - Id {route.params.subjectId}</Text>
  );
}
