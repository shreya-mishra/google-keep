import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import NoteList from "../components/NoteList";
import CreateNote from "../components/CreateNote";

const HomeScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isAddNoteFormVisible, setAddNoteFormVisible] = useState(false);

  const actions = [
    {
      text: "Add Note",
      icon: <Icon name="add" size={20} color="white" />,
      name: "addNote",
      position: 1,
    },
  ];

  const handleCreateNote = (note) => {
    const newNote = { ...note, id: Math.random().toString() };
    setNotes([newNote, ...notes]);
    setAddNoteFormVisible(false);
  };

  const handleEditNote = (editedNote) => {
    console.log("editedNoted", editedNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === editedNote.id ? editedNote : note))
    );
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <View style={styles.container}>
      <CreateNote
        visible={isAddNoteFormVisible}
        onClose={() => setAddNoteFormVisible(false)}
        onCreate={handleCreateNote}
      />
      <NoteList
        notes={notes}
        onDelete={handleDeleteNote}
        onEdit={handleEditNote}
      />
      <FloatingAction
        actions={actions}
        onPressItem={() => setAddNoteFormVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
