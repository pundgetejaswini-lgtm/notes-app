type NoteCardProps = {
    title: string;
    content: string;
  };
  
  export default function NoteCard({
    title,
    content,
  }: NoteCardProps) {
    return (
      <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
  
        <p className="text-gray-400 mt-2">
          {content}
        </p>
      </div>
    );
  }