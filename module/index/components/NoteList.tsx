import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet, Text } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onEdit }: noteListType) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<
    noteType[] | undefined | null
  >(notes);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [notes, searchQuery]);

  const handleSearch = (query: string) => {
    const filtered = notes?.filter(
      (note: noteType) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      {filteredNotes && filteredNotes.length > 0 ? (
        <TextInput
          style={styles.searchInput}
          placeholder="Search Notes..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      ) : (
        <Text style={styles.title}>No notes found!</Text>
      )}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default NoteList;
