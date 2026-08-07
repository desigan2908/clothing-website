import { useState } from "react";

export default function useLocalStorage(
  key,
  initialValue
) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);

    return stored
      ? JSON.parse(stored)
      : initialValue;
  });

  const save = (newValue) => {
    setValue(newValue);

    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  };

  return [value, save];
}