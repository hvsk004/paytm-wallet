import ButtonWithLoader from "../components/ButtonWithLoader";

export default function Temp() {
  async function handler() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Waiting");
  }
  return <ButtonWithLoader children={displayText()} handleClick={handler} />;
}

function displayText() {
  return <p>Click Me</p>;
}
