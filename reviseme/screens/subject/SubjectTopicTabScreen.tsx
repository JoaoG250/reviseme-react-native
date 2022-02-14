import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";
import { useSubject } from "../../contexts/subject";
import { Subject } from "../../interfaces/Subject";
import { Topic } from "../../interfaces/Topic";
import { getTopics } from "../../services/topic";
import baseStyle from "../../styles/base";
import listStyle from "../../styles/list";

export default function SubjectTopicTabScreen() {
  const { subject } = useSubject();
  const [topics, setTopics] = useState<Topic[]>([]);

  // Get subject on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchData(subject: Subject) {
        // Get subject topics
        const topicsResponse = await getTopics({
          subject: subject.id,
        });
        setTopics(topicsResponse.data);
      }

      if (subject) {
        fetchData(subject);
      }
    }, [subject])
  );

  function renderTopic({ item }: { item: Topic }) {
    return (
      <Pressable
        onPress={() => {
          console.log("Topic id:", item.id);
        }}
      >
        <Card
          style={{
            marginBottom: 10,
          }}
        >
          <Card.Title
            title={item.name}
            subtitle={item.description}
            left={(props) => <Avatar.Icon {...props} icon="book" />}
          />
        </Card>
      </Pressable>
    );
  }

  if (topics.length === 0) {
    return (
      <View style={baseStyle.container}>
        <Text style={listStyle.noItemsAlert}>No subject topics</Text>
      </View>
    );
  }

  return (
    <View style={baseStyle.container}>
      <View>
        <Text style={baseStyle.title}>{subject?.name}</Text>
      </View>
      <View style={styles.topicsContainer}>
        <FlatList
          data={topics}
          renderItem={renderTopic}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={baseStyle.separator} />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topicsContainer: {
    width: "100%",
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
