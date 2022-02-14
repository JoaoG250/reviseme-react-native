import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Pressable, FlatList, StyleSheet, View, Text } from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";
import CreateSubjectDialog from "../../components/CreateSubjectDialog";

import { Subject } from "../../interfaces/Subject";
import { getSubjects } from "../../services/subject";
import baseStyle from "../../styles/base";
import listStyle from "../../styles/list";
import { RootTabScreenProps } from "../../types";

export default function SubjectsTabScreen({
  navigation,
}: RootTabScreenProps<"SubjectsTab">) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  async function fetchSubjects() {
    const response = await getSubjects();
    setSubjects(response.data);
  }

  // Fetch the data on screen focus
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        await fetchSubjects();
      }
      fetchData();
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

  const showDialog = () => setDialogVisible(true);

  const hideDialog = () => setDialogVisible(false);

  if (subjects.length === 0) {
    return (
      <View style={baseStyle.container}>
        <Text style={listStyle.noItemsAlert}>No subjects</Text>
      </View>
    );
  }

  return (
    <View style={baseStyle.container}>
      <CreateSubjectDialog
        visible={dialogVisible}
        hideDialog={hideDialog}
        confirmAction={fetchSubjects}
      />
      <View style={styles.subjectContainer}>
        <FlatList
          data={subjects}
          renderItem={renderSubject}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={baseStyle.separator} />
      <FAB style={styles.fab} icon="plus" onPress={showDialog} />
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
