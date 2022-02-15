import { Button, Dialog, Portal, Text } from "react-native-paper";

interface CompleteRevisionDialogProps {
  visible: boolean;
  hideDialog: () => void;
  confirmAction?: () => void;
}

export default function CompleteRevisionDialog({
  visible,
  hideDialog,
  confirmAction,
}: CompleteRevisionDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Complete Revision</Dialog.Title>
        <Dialog.Content>
          <Text>
            Do you want to mark the revision of this topic as complete?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={confirmAction}>Complete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
