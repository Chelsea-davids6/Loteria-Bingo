import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import PlayPage from './components/PlayPage.jsx';
import HowToPlayPage from './components/HowToPlayPage.jsx';
import Settings from './components/Settings.jsx';
import HowToPlayPageTwo from './components/HowToPlayPageTwo.jsx';
import HowToPlayPageThree from './components/HowToPlayPageThree.jsx';
import PlayWithBots from './components/PlayWithBots.jsx';
import BingoCard from './components/BingoCard.jsx';
import PlayAlone from './components/PlayAlone.jsx';




function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/how-to-play-page-two" element={<HowToPlayPageTwo />} />
        <Route path="/how-to-play-page-three" element={<HowToPlayPageThree />} />
        <Route path="/play-with-bots" element={<PlayWithBots />} />
        <Route path="/bingo-card" element={<BingoCard />} />
        <Route path="/play-alone" element={<PlayAlone />} />
      </Routes>
    </Router>
  );
}

export default App;
