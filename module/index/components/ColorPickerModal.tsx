// ColorPickerModal.js
import React, { useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import ColorWheel from "react-native-wheel-color-picker";

const ColorPickerModal = ({
  visible,
  onClose,
  onSelectColor,
}: colorPickerModalType) => {
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleColorSelect = () => {
    onSelectColor(selectedColor);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Pick a Color</Text>
          <ColorWheel
            initialColor={selectedColor}
            onColorChange={handleColorChange}
            style={styles.colorPicker}
          />
          <TouchableOpacity
            style={styles.selectButton}
            onPress={handleColorSelect}
          >
            <Text style={styles.selectButtonText}>Select Color</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorPicker: {
    height: 200,
    width: "100%",
  },
  slider: {
    width: "100%",
    height: 40,
    marginTop: 10,
  },
  selectButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  selectButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ColorPickerModal;
