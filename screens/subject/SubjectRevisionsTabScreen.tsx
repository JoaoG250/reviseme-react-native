import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Card, Checkbox, ProgressBar } from "react-native-paper";
import { useSubject } from "../../contexts/subject";
import { Subject } from "../../interfaces/Subject";
import { TopicRevision } from "../../interfaces/Topic";
import { getSubjectRevisionProgress } from "../../services/subject";
import { getTopicRevisions } from "../../services/topic";
import baseStyle from "../../styles/base";
import listStyle from "../../styles/list";
import progressStyle from "../../styles/progress";
import { SubjectTabScreenProps } from "../../types";
import { formatDate } from "../../utils/formatters";

export default function SubjectRevisionsTabScreen({
  navigation,
}: SubjectTabScreenProps<"SubjectRevisionsTab">) {
  const { subject } = useSubject();
  const [revisions, setRevisions] = useState<TopicRevision[]>([]);
  const [revisionProgress, setRevisionProgress] = useState<number>(0);

  // Get subject on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchData(subject: Subject) {
        // Get subject topics
        const revisionsResponse = await getTopicRevisions({
          subject: subject.id,
        });
        setRevisions(revisionsResponse.data);

        // Get revision progress
        const revisionProgressResponse = await getSubjectRevisionProgress(
          subject.id
        );

        // Round to two decimal places
        const progress = Number(
          revisionProgressResponse.data.progress.toFixed(2)
        );

        setRevisionProgress(progress);
      }

      if (subject) {
        fetchData(subject);
      }
    }, [subject])
  );

  function renderTopicRevision({ item }: { item: TopicRevision }) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Topic", { topicId: item.topic.id });
        }}
      >
        <Card
          style={{
            marginBottom: 10,
          }}
        >
          <Card.Title
            title={item.topic.name}
            subtitle={formatDate(item.updatedAt)}
            right={(props) => (
              <Checkbox
                {...props}
                status={item.complete ? "checked" : "unchecked"}
                disabled
              />
            )}
          />
        </Card>
      </Pressable>
    );
  }

  if (revisions.length === 0) {
    return (
      <View style={baseStyle.container}>
        <Text style={listStyle.noItemsAlert}>No revisions</Text>
      </View>
    );
  }

  return (
    <View style={baseStyle.container}>
      <Text style={baseStyle.title}>Revisions</Text>
      <View style={styles.revisionsContainer}>
        <FlatList
          data={revisions}
          renderItem={renderTopicRevision}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={baseStyle.separator} />
      <Text style={progressStyle.revisionProgressPercentage}>
        {revisionProgress}%
      </Text>
      <View style={progressStyle.progressContainer}>
        <ProgressBar progress={revisionProgress / 100} />
      </View>
      <Text>{revisionProgress}% of revisions completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  revisionsContainer: {
    width: "100%",
    maxHeight: "50%",
    padding: 16,
  },
});
