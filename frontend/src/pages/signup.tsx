import { useState } from "react";
import { LabeledInput } from "../components/labeledInput";
export function Signup() {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="border-4 border-black rounded-md p-7 m-5 flex flex-col items-center">
      <h2 className="text-3xl font-semibold my-3">Signup</h2>
      <LabeledInput
        label={"First Name"}
        name={"firstname"}
        type={"text"}
        placeholder={"Jhon"}
        onchange={handleChange}
        value={firstname}
      />
      <LabeledInput
        label={"Last Name"}
        name={"lastname"}
        type={"text"}
        placeholder={"Doe"}
        onchange={handleChange}
        value={lastname}
      />
      <LabeledInput
        label={"Email"}
        name={"email"}
        type={"email"}
        placeholder={"example@example.com"}
        onchange={handleChange}
        value={email}
      />
      <LabeledInput
        label={"Password"}
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        onchange={handleChange}
        value={password}
      />

      <button className="border-2 text-white bg-black  rounded-md p-2 m-2 min-w-xs ">
        Signup
      </button>
    </div>
  );
}
