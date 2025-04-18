interface MessageInput {
  text: string;
  color: "red-600" | "green-600" | "blue-600"; // add allowed Tailwind colors
}

export default function ShowMessage({ text, color }: MessageInput) {
  return (
    <div>
      <p className={`text-${color}`}>{text}</p>
    </div>
  );
}
