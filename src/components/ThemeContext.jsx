import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Проверяем сохранённую тему
  const savedTheme = localStorage.getItem("theme");

  // Если нет сохранённой темы, определяем по системной
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // Сохраняем в localStorage и обновляем атрибут для CSS
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Слушаем изменения системной темы, если пользователь не выбирал вручную
  useEffect(() => {
    if (savedTheme) return; // игнорируем, если пользователь уже выбрал
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = e => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [savedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};