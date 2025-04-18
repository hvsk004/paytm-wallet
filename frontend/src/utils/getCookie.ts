export default function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    if (cookie === undefined) {
      throw new Error(`Cookie '${name}' found but value is undefined`);
    }
    return cookie;
  } else {
    throw new Error(`Cookie '${name}' not found`);
  }
}