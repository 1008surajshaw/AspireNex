

const ThemeToggle = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? '🌞 Light Mode' : '🌚 Dark Mode'}
    </div>
  );
};

export default ThemeToggle;
