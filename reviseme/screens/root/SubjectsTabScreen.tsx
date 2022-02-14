import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Pressable, FlatList, StyleSheet, View } from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";

import { Subject } from "../../interfaces/Subject";
import { getSubjects } from "../../services/subject";
import baseStyle from "../../styles/base";
import { RootTabScreenProps } from "../../types";

export default function SubjectsTabScreen({
  navigation,
}: RootTabScreenProps<"SubjectsTab">) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Fetch the data on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchSubjects() {
        const response = await getSubjects();
        setSubjects(response.data);
      }
      fetchSubjects();
    }, [])
  );

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
    <View style={baseStyle.container}>
      <View style={styles.subjectContainer}>
        <FlatList
          data={subjects}
          renderItem={renderSubject}
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
  subjectContainer: {
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
