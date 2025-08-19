import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme from localStorage if present
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
