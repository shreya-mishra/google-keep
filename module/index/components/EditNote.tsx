// EditNote.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const EditNote = ({ visible, onClose, onSave, noteToEdit }: editNoteType) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  useEffect(() => {
    setTitle(noteToEdit?.title || "");
    setContent(noteToEdit?.content || "");
    setSelectedColor(noteToEdit?.color || "#ffffff");
  }, [noteToEdit]);

  const handleSave = () => {
    if (title && content) {
      onSave({
        ...noteToEdit,
        title,
        content,
        color: selectedColor,
        noteToEdit: null,
      });
      setTitle("");
      setContent("");
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
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit your note</Text>

          <TouchableOpacity
            style={[
              styles.colorPickerButton,
              { backgroundColor: selectedColor },
            ]}
            onPress={() => setColorPickerVisible(true)}
          />

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
            <Button title="Save" onPress={handleSave} color="#007BFF" />
          </View>
        </View>
      </View>
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
  colorPickerButton: {
    height: 40,
    borderRadius: 5,
    // marginBottom: 10,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default EditNote;
