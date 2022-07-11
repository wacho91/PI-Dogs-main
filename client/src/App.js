import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateDog from './components/CreateDog/CreateDog';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<CreateDog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
