// HomeScreen.js
import React, { useState } from "react";
import { View, Button } from "react-native";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";
const HomeScreen = () => {
  const [notes, setNotes] = useState([]);

  const handleCreateNote = (note) => {
    const newNote = { ...note, id: Math.random() };
    setNotes([newNote, ...notes]);
  };

  const handleEditNote = (editedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === editedNote.id ? editedNote : note))
    );
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <View>
      <CreateNote onCreate={handleCreateNote} />
      <NoteList
        notes={notes}
        onDelete={handleDeleteNote}
        onEdit={handleEditNote}
      />
    </View>
  );
};

export default HomeScreen;
