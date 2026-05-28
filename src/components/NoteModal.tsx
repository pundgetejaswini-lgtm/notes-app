"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editingNote
              ? "Edit Note"
              : "Create Note"}
          </DialogTitle>
        </DialogHeader>

        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-4 bg-zinc-900 border border-zinc-800 text-white rounded-2xl p-4 outline-none"
        />

        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mt-4 bg-zinc-900 border border-zinc-800 text-white rounded-2xl p-4 outline-none min-h-[140px]"
        />

        <button
          onClick={() => {
            onAddNote(title, content);
          }}
          className="w-full mt-4 bg-white text-black rounded-2xl p-4 font-semibold hover:scale-[1.02] transition"
        >
          {editingNote
            ? "Update Note"
            : "Save Note"}
        </button>
      </DialogContent>
    </Dialog>
  );
}