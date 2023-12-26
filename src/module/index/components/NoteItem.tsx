import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ColorPickerModal from "./ColorPickerModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteItem = ({ note, onDelete, onEdit }: noteItemType) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    // Load color from local storage when component mounts
    loadColor();
  }, []);

  const saveColor = async (color: string) => {
    try {
      await AsyncStorage.setItem(`noteColor:${note.id}`, color);
    } catch (e) {
      console.error("Error saving color to AsyncStorage:", e);
    }
  };

  const loadColor = async () => {
    try {
      const savedColor = await AsyncStorage.getItem(`noteColor:${note.id}`);
      if (savedColor) {
        setSelectedColor(savedColor);
      }
    } catch (e) {
      console.error("Error loading color from AsyncStorage:", e);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    saveColor(color);
    setColorPickerVisible(false);
  };

  const renderContent = () => {
    if (showFullContent) {
      return (
        <>
          <Text style={styles.fullContentTitle}>{note.title}</Text>
          <Text style={styles.fullContent}>{note.content}</Text>
          <TouchableOpacity onPress={() => setShowFullContent(false)}>
            <Text style={styles.readMore}>Read Less</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.content} numberOfLines={3}>
            {note.content}
          </Text>
          <TouchableOpacity onPress={() => setShowFullContent(true)}>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: selectedColor }]}>
      <TouchableOpacity onPress={() => onEdit(note)}>
        <Text style={styles.title}>{note.title}</Text>
        {renderContent()}
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
          onSelectColor={(color: string) => handleColorSelect(color)}
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  readMore: {
    color: "blue",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 15,
  },
  fullContentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fullContent: {
    fontSize: 18,
  },
});

export default NoteItem;
