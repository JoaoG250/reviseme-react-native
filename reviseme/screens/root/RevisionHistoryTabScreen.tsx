import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Checkbox, Colors, ProgressBar } from "react-native-paper";
import { TopicRevision } from "../../interfaces/Topic";
import { getTopicRevisionsHistory } from "../../services/topic";
import { formatDate } from "../../utils/formatters";

export default function HistoryTabScreen() {
  const [topicRevisionsHistory, setTopicRevisionsHistory] = useState<
    TopicRevision[]
  >([]);

  // Fetch the data on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const response = await getTopicRevisionsHistory();
        setTopicRevisionsHistory(response.data);
      }

      fetchData();
    }, [])
  );

  function renderTopicRevision({ item }: { item: TopicRevision }) {
    return (
      <Card
        style={{
          marginBottom: 10,
        }}
      >
        <Card.Title
          title={item.topic.name}
          subtitle={formatDate(item.updatedAt)}
          right={(props) => <Checkbox {...props} status="checked" disabled />}
        />
      </Card>
    );
  }

  if (topicRevisionsHistory.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItemsAlert}>No revision history</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <FlatList
          data={topicRevisionsHistory}
          renderItem={renderTopicRevision}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  historyContainer: {
    width: "100%",
    padding: 16,
  },
  noItemsAlert: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: Colors.orangeA100,
  },
});
