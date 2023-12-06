import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import NoteList from "../components/NoteList";
import CreateNote from "../components/CreateNote";
import EditNote from "../components/EditNote";

const HomeScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isAddNoteFormVisible, setAddNoteFormVisible] = useState(false);
  const [isEditNoteFormVisible, setEditNoteFormVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

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

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setEditNoteFormVisible(true);
  };

  const handleSaveEditNote = (editedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === editedNote.id ? editedNote : note))
    );
    setEditNoteFormVisible(false);
    setNoteToEdit(null);
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
      <EditNote
        visible={isEditNoteFormVisible}
        onClose={() => setEditNoteFormVisible(false)}
        onSave={handleSaveEditNote}
        noteToEdit={noteToEdit}
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
