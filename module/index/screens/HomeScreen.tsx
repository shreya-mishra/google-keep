import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import NoteList from "../components/NoteList";
import CreateNote from "../components/CreateNote";
import EditNote from "../components/EditNote";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const HomeScreen = () => {
  const [notes, setNotes] = useState<noteType[]>([]);
  const [isAddNoteFormVisible, setAddNoteFormVisible] = useState(false);
  const [isEditNoteFormVisible, setEditNoteFormVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<noteType | null>(null);

  useEffect(() => {
    // Load notes from local storage when component mounts
    loadNotes();
  }, []);

  const saveNotes = async (notesToSave: noteType[]) => {
    try {
      const jsonNotes = JSON.stringify(notesToSave);
      await AsyncStorage.setItem("notes", jsonNotes);
    } catch (error) {
      console.error("Error saving notes to AsyncStorage:", error);
    }
  };

  const loadNotes = async () => {
    try {
      const jsonNotes = await AsyncStorage.getItem("notes");
      if (jsonNotes) {
        const loadedNotes = JSON.parse(jsonNotes);
        setNotes(loadedNotes);
      }
    } catch (error) {
      console.error("Error loading notes from AsyncStorage:", error);
    }
  };

  const actions = [
    {
      text: "Add Note",
      icon: <Icon name="add" size={20} color="white" />,
      name: "addNote",
      position: 1,
    },
  ];

  const handleCreateNote = (note: noteType) => {
    const newNote = { ...note, id: uuid.v4() };
    const updatedNotes: noteType[] = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setAddNoteFormVisible(false);
  };

  const handleEditNote = (note: noteType) => {
    setNoteToEdit(note);
    setEditNoteFormVisible(true);
  };

  const handleSaveEditNote = (editedNote: noteType) => {
    const updatedNotes: updatedNotesType = notes.map((note: noteType) =>
      note.id === editedNote.id ? editedNote : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setEditNoteFormVisible(false);
    setNoteToEdit(null);
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes: updatedNotesType = notes.filter(
      (note: noteType) => note.id !== noteId
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
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
    padding: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
});

export default HomeScreen;
