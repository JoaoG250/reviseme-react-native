import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";

import { View } from "../components/Themed";
import { Subject } from "../interfaces/Subject";
import { RootTabScreenProps } from "../types";

export default function SubjectsTabScreen({
  navigation,
}: RootTabScreenProps<"SubjectsTab">) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Create test data for subjects on component mount
  useEffect(() => {
    setSubjects([
      {
        id: 1,
        name: "Mathematics",
        description: "Mathematics subject",
      },
      {
        id: 2,
        name: "English",
        description: "English subject",
      },
      {
        id: 3,
        name: "Science",
        description: "Science subject",
      },
    ]);
  }, []);

  function renderSubject({ item }: { item: Subject }) {
    return (
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

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
