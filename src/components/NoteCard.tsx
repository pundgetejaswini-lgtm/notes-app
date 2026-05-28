"use client";

import jsPDF from "jspdf";

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
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>

          <p className="text-zinc-400 mt-3">
            {content}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onEdit}
            className="text-blue-400 text-sm"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="text-red-400 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 bg-white text-black px-4 py-2 rounded-xl font-medium hover:scale-105 transition"
      >
        Download PDF
      </button>
    </div>
  );
}