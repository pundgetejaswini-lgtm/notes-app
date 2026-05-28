"use client";

import jsPDF from "jspdf";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type NoteCardProps = {
  title: string;
  content: string;
  onDelete: () => void;
  onEdit: () => void;
};

export default function NoteCard({
  title,
  content,
  onDelete,
  onEdit,
}: NoteCardProps) {

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(title, 20, 30);

    doc.setFontSize(12);
    doc.text(content, 20, 50);

    doc.save(`${title}.pdf`);
  };

  return (
    <Card className="bg-zinc-950/80 border border-zinc-800 rounded-3xl backdrop-blur-xl transition-all hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl">
      <CardContent className="p-6">

        <div className="flex items-start justify-between gap-6">

          <div className="flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {title}
            </h2>

            <p className="text-zinc-400 mt-4 leading-relaxed">
              {content}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={onEdit}
              className="text-xs text-blue-400 hover:text-blue-300 transition"
            >
              Edit
            </button>

            <button
              onClick={onDelete}
              className="text-xs text-red-400 hover:text-red-300 transition"
            >
              Delete
            </button>
          </div>

        </div>

        <button
          onClick={downloadPDF}
          className="mt-8 w-full bg-white text-black rounded-2xl py-3 font-medium hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          Download PDF
        </button>

      </CardContent>
    </Card>
  );
}