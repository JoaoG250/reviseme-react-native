import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Checkbox } from "react-native-paper";
import { TopicRevision } from "../../interfaces/Topic";
import { getTopicRevisionsHistory } from "../../services/topic";
import baseStyle from "../../styles/base";
import listStyle from "../../styles/list";
import { formatDate } from "../../utils/formatters";

export default function RevisionHistoryTabScreen() {
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
      <View style={baseStyle.container}>
        <Text style={listStyle.noItemsAlert}>No revision history</Text>
      </View>
    );
  }

  return (
    <View style={baseStyle.container}>
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
  historyContainer: {
    width: "100%",
    padding: 16,
  },
});
