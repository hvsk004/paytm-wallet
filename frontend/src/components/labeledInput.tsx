import { ILabeledInput } from "../types";
export function LabeledInput({
  label,
  type,
  name,
  placeholder,
  onchange,
  value,
}: ILabeledInput) {
  return (
    <div>
      <label htmlFor={name} className="mx-3 text-md font-medium">
        {label}
      </label>
      <br />
      <input
        className="border-2 border-black rounded-md p-2 m-2 min-w-xs"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onchange}
        value={value}
      />
    </div>
  );
}
