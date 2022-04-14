import { useState } from "react";
import { Image, Text, View } from "react-native";
import baseStyle from "../../styles/base";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { createTopicFile, ImageFile } from "../../services/topic";
import { useTopic } from "../../contexts/topic";

export default function CreateTopicMaterialScreen() {
  const { topic } = useTopic();
  const [image, setImage] = useState<ImageFile>();

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const filename = result.uri.split("/").pop();
      if (!filename) {
        throw new Error("Could not extract filename from picker result");
      }

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      setImage({
        uri: result.uri,
        name: filename,
        type: type,
      });
    }
  }

  async function handleSubmit() {
    if (!topic || !image) return;
    try {
      await createTopicFile({
        topic: topic.id,
        file: image,
        fileType: "IMAGE",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={baseStyle.container}>
      <Text style={baseStyle.title}>CreateTopicMaterialScreen</Text>
      <Button mode="contained" onPress={pickImage}>
        Pick an image from camera roll
      </Button>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button mode="contained" onPress={handleSubmit}>
        Upload Image
      </Button>
    </View>
  );
}
