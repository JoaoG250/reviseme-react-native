import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { createTopic, CreateTopicInput } from "../services/topic";
import { Subject } from "../interfaces/Subject";

interface CreateTopicDialogProps {
  subject: Subject;
  visible: boolean;
  hideDialog: () => void;
  confirmAction?: () => void;
}

export default function CreateTopicDialog({
  subject,
  visible,
  hideDialog,
  confirmAction,
}: CreateTopicDialogProps) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      subject: subject.id,
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: CreateTopicInput) {
    await createTopic(data);
    reset();

    // Execute the confirm action if it exists
    if (confirmAction) {
      confirmAction();
    }

    hideDialog();
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Create Topic</Dialog.Title>
        <Dialog.Content>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                label="Name"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                label="Description"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handleSubmit(onSubmit)}>Create</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
});
