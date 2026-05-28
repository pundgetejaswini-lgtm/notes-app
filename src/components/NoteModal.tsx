"use client";

import { useEffect, useState } from "react";

type NoteModalProps = {
  isOpen: boolean;
  onAddNote: (title: string, content: string) => void;
  editingNote: {
    title: string;
    content: string;
  } | null;
};

export default function NoteModal({
  isOpen,
  onAddNote,
  editingNote,
}: NoteModalProps) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6">
      <div className="bg-zinc-900 w-full max-w-md rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-white">
          {editingNote ? "Edit Note" : "Create Note"}
        </h2>

        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-6 bg-zinc-800 text-white rounded-xl p-4 outline-none"
        />

        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mt-4 bg-zinc-800 text-white rounded-xl p-4 outline-none min-h-[120px]"
        />

        <button
          onClick={() => {
            onAddNote(title, content);
          }}
          className="w-full mt-6 bg-white text-black rounded-xl p-4 font-semibold"
        >
          {editingNote ? "Update Note" : "Save Note"}
        </button>
      </div>
    </div>
  );
}