import './App.css';
import Body from './components/Body/Body';
import Header from './components/Header/Header';
import List from './components/List/List';
import { useThemeContext } from './contexts/ThemeProvider';

function App() {
  return (
    <div className={`App${useThemeContext().theme === 'light' ? '': ' dark'}`}>
      <Header />
      <Body />
      <List />
    </div>
  );
}

export default App;
