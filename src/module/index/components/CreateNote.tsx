import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const CreateNote = ({ visible, onClose, onCreate }: createNoteType) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (title && content) {
      onCreate({ title, content });
      setTitle("");
      setContent("");
      onClose();
    }
  };

  const isCreateButtonDisabled = !title || !content;

  const handleTouchablePress = () => {
    if (visible) {
      Keyboard.dismiss();
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={[styles.input, styles.fullWidthInput]}
              placeholder="Content"
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Create"
                onPress={handleCreate}
                color="#007BFF"
                disabled={isCreateButtonDisabled}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 16,
  },
  fullWidthInput: {
    width: "100%",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default CreateNote;
