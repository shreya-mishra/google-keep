import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import NoteItem from "./NoteItem";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
  const clearSearch = () => {
    setSearchQuery("");
    handleSearch("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Notes..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery ? (
          <TouchableWithoutFeedback
            style={styles.clearButton}
            onPress={clearSearch}
          >
            <Text style={styles.x}>X</Text>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      {filteredNotes && filteredNotes.length > 0 ? (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
          )}
        />
      ) : (
        <Text style={styles.title}>No notes found!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  clearButton: {
    padding: 8,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    // borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  x: {},
});

export default NoteList;
