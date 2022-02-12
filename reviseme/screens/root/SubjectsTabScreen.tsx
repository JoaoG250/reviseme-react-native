import { useEffect, useState } from "react";
import { Pressable, FlatList, StyleSheet, View } from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";

import { Subject } from "../../interfaces/Subject";
import { getSubjects } from "../../services/subject";
import { RootTabScreenProps } from "../../types";

export default function SubjectsTabScreen({
  navigation,
}: RootTabScreenProps<"SubjectsTab">) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Create test data for subjects on component mount
  useEffect(() => {
    async function fetchSubjects() {
      const response = await getSubjects();
      setSubjects(response.data);
    }
    fetchSubjects();
  }, []);

  function renderSubject({ item }: { item: Subject }) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Subject", {
            subjectId: item.id,
          });
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
      <View style={styles.subjectContainer}>
        <FlatList
          data={subjects}
          renderItem={renderSubject}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.separator} />
      <FAB icon="plus" onPress={() => console.log("Pressed")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subjectContainer: {
    width: "100%",
    padding: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
