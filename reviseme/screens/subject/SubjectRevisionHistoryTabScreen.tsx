import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Subject } from "../../interfaces/Subject";
import { getSubject } from "../../services/subject";
import { SubjectTabScreenProps } from "../../types";

export default function SubjectRevisionHistoryTabScreen({
  route,
}: SubjectTabScreenProps<"SubjectRevisionHistoryTab">) {
  const [subject, setSubject] = useState<Subject>();

  // Get subject on component mount
  useEffect(() => {
    async function fetchSubject() {
      const response = await getSubject(route.params.subjectId);
      setSubject(response.data);
    }
    fetchSubject();
  }, []);

  return <Text>{JSON.stringify(subject)}</Text>;
}
