// NoteItem.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onEdit(note)}>
        <Text>{note.title}</Text>
        <Text>{note.content}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(note.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteItem;
