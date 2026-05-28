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
    const newNote = {
      title,
      content,
    };

    setNotes((prevNotes) => [
      newNote,
      ...prevNotes,
    ]);

    setIsModalOpen(false);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold">
          Notes App
        </h1>

        <p className="mt-2 text-gray-400">
          Capture your thoughts beautifully.
        </p>

        <div className="mt-8 space-y-4">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              title={note.title}
              content={note.content}
            />
          ))}
        </div>
      </div>

      <AddButton
        onClick={() => setIsModalOpen(true)}
      />

      <NoteModal
        isOpen={isModalOpen}
        onAddNote={addNote}
      />
    </main>
  );
}