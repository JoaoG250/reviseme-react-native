import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { createSubject, CreateSubjectInput } from "../services/subject";
import { StyleSheet } from "react-native";

interface CreateSubjectDialogProps {
  visible: boolean;
  hideDialog: () => void;
  confirmAction?: () => void;
}

export default function CreateSubjectDialog({
  visible,
  hideDialog,
  confirmAction,
}: CreateSubjectDialogProps) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: CreateSubjectInput) {
    await createSubject(data);
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
        <Dialog.Title>Create Subject</Dialog.Title>
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
