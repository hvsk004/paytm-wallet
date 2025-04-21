import { useState } from "react";
import { LabeledInput } from "../components/labeledInput";
import { signup, login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import ButtonWithLoader from "../components/ButtonWithLoader";

export function Signup() {
  const navigate = useNavigate();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleSignup() {
    try {
      const response = await signup({
        firstName,
        lastName,
        username,
        password,
      });

      if (response.status === 201) {
        setMessage("Signup Successful redirecting to Dashboard.....");

        const loginResponse = await login({ username, password });

        if (loginResponse.status === 200) {
          localStorage.removeItem("paytm-jwt");
          localStorage.setItem("paytm-jwt", loginResponse.data.jwt);

          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("Signup Failed", err);
      setErrorMsg(err?.response?.data?.message);
    }
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  return (
    <div className="border-4 border-black rounded-md p-7 m-5 flex flex-col items-center">
      <h2 className="text-3xl font-semibold my-3">Signup</h2>
      <LabeledInput
        label={"First Name"}
        name={"firstname"}
        type={"text"}
        placeholder={"Jhon"}
        onchange={handleChange}
        value={firstName}
      />
      <LabeledInput
        label={"Last Name"}
        name={"lastname"}
        type={"text"}
        placeholder={"Doe"}
        onchange={handleChange}
        value={lastName}
      />
      <LabeledInput
        label={"Email"}
        name={"username"}
        type={"email"}
        placeholder={"example@example.com"}
        onchange={handleChange}
        value={username}
      />
      <LabeledInput
        label={"Password"}
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        onchange={handleChange}
        value={password}
      />
      <ButtonWithLoader children={<p>Signup</p>} handleClick={handleSignup} />
      <p className="text-md text-green-600">{message}</p>
      <p className="text-md text-red-600">{errorMsg}</p>
    </div>
  );
}
