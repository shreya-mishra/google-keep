// NoteList.js
import React from "react";
import { FlatList } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
      renderItem={({ item }) => (
        <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};

export default NoteList;
