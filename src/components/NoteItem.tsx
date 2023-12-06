import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ColorPickerModal from "./ColorPickerModal";

const NoteItem = ({ note, onDelete, onEdit }) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  return (
    <View style={[styles.card, { backgroundColor: selectedColor }]}>
      <TouchableOpacity onPress={() => onEdit(note)}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.content}>{note.content}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onEdit(note)}>
          <Icon name="edit" size={20} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
          <Icon
            name="format-color-fill"
            size={20}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(note.id)}>
          <Icon name="delete" size={20} color="red" style={styles.icon} />
        </TouchableOpacity>

        <ColorPickerModal
          visible={isColorPickerVisible}
          onClose={() => setColorPickerVisible(false)}
          onSelectColor={(color: string) => {
            setSelectedColor(color);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    margin: 10,
    elevation: 3, // Android elevation for shadow
    shadowColor: "#000", // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 15,
  },
});

export default NoteItem;
