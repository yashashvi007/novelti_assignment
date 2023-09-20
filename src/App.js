import { Routes , Route } from 'react-router-dom';
import './App.css';
import Create from './screens/Home/Create';
import Users from './screens/Users/Users';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Users/>} />
        <Route path="/create" element={<Create/>} />
    </Routes>
  );
}

export default App;
