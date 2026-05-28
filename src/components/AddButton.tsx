type AddButtonProps = {
  onClick: () => void;
};

export default function AddButton({
  onClick,
}: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-white text-black text-3xl shadow-lg"
    >
      +
    </button>
  );
}