import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import CompleteRevisionDialog from "../../components/CompleteRevisionDialog";
import { useTopic } from "../../contexts/topic";
import { completeTopicRevision } from "../../services/topic";
import baseStyle from "../../styles/base";

export default function TopicTabScreen() {
  const { loading, topic } = useTopic();
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);

  const hideDialog = () => setDialogVisible(false);

  async function completeRevision() {
    if (!topic) return;
    await completeTopicRevision(topic.id);
    hideDialog();
  }

  if (loading || !topic) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <View style={baseStyle.container}>
      <CompleteRevisionDialog
        visible={dialogVisible}
        hideDialog={hideDialog}
        confirmAction={completeRevision}
      />
      <Text style={baseStyle.title}>{topic.name}</Text>
      <Text>{topic.description}</Text>
      <FAB
        style={styles.fab}
        label="Complete"
        icon="check-bold"
        onPress={showDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
