import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";
import { useSubject } from "../../contexts/subject";
import { Subject } from "../../interfaces/Subject";
import { Topic } from "../../interfaces/Topic";
import { getTopics } from "../../services/topic";

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{subject?.name}</Text>
      </View>
      <View style={styles.topicsContainer}>
        <FlatList
          data={topics}
          renderItem={renderTopic}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.separator} />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 20,
  },
  topicsContainer: {
    width: "100%",
    padding: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
