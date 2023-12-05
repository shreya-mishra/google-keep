// CreateNote.js
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    onCreate({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
};

export default CreateNote;
