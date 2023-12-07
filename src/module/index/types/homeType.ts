type notesToSaveType = {
  content: string;
  title: string;
  id: string;
  color: string;
}[];

type noteType = {
  id: string;
  content: string;
  title: string;
  color: string;
};

type updatedNotesType = noteType[];

type colorPickerModalType = {
  visible: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => {};
};

type createNoteType = {
  visible: boolean;
  onClose: () => void;
  onCreate: (noteType: { title: string; content: string }) => void;
};

type editNoteType = {
  visible: boolean;
  onClose: () => void;
  onSave: (noteType: {
    noteToEdit: noteType | null;
    title: string;
    content: string;
    color: string;
  }) => void;
  noteToEdit: noteType | null;
};

type noteItemType = {
  note: noteType;
  onDelete: (id: string) => void;
  onEdit: (note: noteType) => void;
};

type noteListType = {
  notes: noteType[] | null;
  onDelete: (id: string) => void;
  onEdit: (note: noteType) => void;
};
