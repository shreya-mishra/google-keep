import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onEdit(note)}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.content}>{note.content}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onEdit(note)}>
          <Icon name="edit" size={20} color="#007BFF" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(note.id)}>
          <Icon name="delete" size={20} color="red" style={styles.icon} />
        </TouchableOpacity>
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
    backgroundColor: "white",
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
    // marginTop: 10,
  },
  icon: {
    marginLeft: 15,
  },
});

export default NoteItem;
