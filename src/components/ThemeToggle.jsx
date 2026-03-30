import { useEffect, useState } from "react";

const SunIcon = () => <i className="bi bi-brightness-high-fill"></i>;
const MoonIcon = () => <i className="bi bi-moon"></i>;

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Cambia tema"
      className="viola border-viola"
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "transparent",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s, transform 0.15s",
      }}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
