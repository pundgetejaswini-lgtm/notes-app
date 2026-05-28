"use client";

import { useEffect, useState } from "react";
import NoteCard from "@/components/NoteCard";
import AddButton from "@/components/AddButton";
import NoteModal from "@/components/NoteModal";

type Note = {
  title: string;
  content: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "notes",
        JSON.stringify(notes)
      );
    }
  }, [notes, isLoaded]);

  const addNote = (title: string, content: string) => {

    if (editingIndex !== null) {
      const updatedNotes = [...notes];

      updatedNotes[editingIndex] = {
        title,
        content,
      };

      setNotes(updatedNotes);

      setEditingIndex(null);

    } else {

      const newNote = {
        title,
        content,
      };

      setNotes((prevNotes) => [
        newNote,
        ...prevNotes,
      ]);
    }

    setIsModalOpen(false);
  };

  const deleteNote = (indexToDelete: number) => {
    const updatedNotes = notes.filter(
      (_, index) => index !== indexToDelete
    );

    setNotes(updatedNotes);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#27272a,transparent_40%)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-14">

        <div className="mb-12">

          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Personal Workspace
          </p>

          <h1 className="text-6xl font-semibold tracking-tight mt-4">
            Notes
          </h1>

          <p className="text-zinc-400 text-lg mt-4 max-w-md leading-relaxed">
            Capture ideas, thoughts, reflections,
            and important moments beautifully.
          </p>

        </div>

        {notes.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-[32px] p-14 text-center bg-zinc-950/40 backdrop-blur-xl">

            <div className="text-6xl mb-6">
              ✨
            </div>

            <h2 className="text-2xl font-semibold">
              No notes yet
            </h2>

            <p className="text-zinc-500 mt-3">
              Start capturing your ideas and thoughts.
            </p>

          </div>
        ) : (
          <div className="space-y-6">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                title={note.title}
                content={note.content}
                onDelete={() => deleteNote(index)}
                onEdit={() => openEditModal(index)}
              />
            ))}
          </div>
        )}

      </div>

      <AddButton
        onClick={() => {
          setEditingIndex(null);
          setIsModalOpen(true);
        }}
      />

      <NoteModal
        isOpen={isModalOpen}
        onAddNote={addNote}
        editingNote={
          editingIndex !== null
            ? notes[editingIndex]
            : null
        }
      />
    </main>
  );
}