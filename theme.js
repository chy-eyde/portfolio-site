// this js file fedines the functionality of the light/dark mode button and persists it. (While the CSS determines the look of each state)
// Wires up the click — when the sun/moon button is pressed, it flips which theme is active.
// Reflects that choice visibly — swaps the icon (sun ↔ moon) and updates the aria-label so it always describes the next click's action.
// Persists it — saves the choice to localStorage so if the visitor closes the tab and comes back, their preference is restored instead of resetting to light mode every time.

const toggle = document.querySelector('.mode-toggle');
const root = document.documentElement;   // the <html> element

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    toggle.textContent = '\u263E';   // ☾ moon
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    root.removeAttribute('data-theme');
    toggle.textContent = '\u2600';   // ☀ sun
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

const saved = localStorage.getItem('theme');
if (saved) applyTheme(saved);

toggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});