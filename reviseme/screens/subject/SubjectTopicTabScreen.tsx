import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Text } from "react-native";
import { Subject } from "../../interfaces/Subject";
import { getSubject } from "../../services/subject";
import { SubjectTabScreenProps } from "../../types";

export default function SubjectTopicTabScreen({
  route,
}: SubjectTabScreenProps<"SubjectTopicTab">) {
  const [subject, setSubject] = useState<Subject>();

  // Get subject on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchSubject() {
        const response = await getSubject(route.params.subjectId);
        setSubject(response.data);
      }
      fetchSubject();
    }, [])
  );

  return <Text>{JSON.stringify(subject)}</Text>;
}
