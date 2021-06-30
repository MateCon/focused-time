import React, { useState } from 'react';
import Menu from './Menu';
import Timer from './Timer';
import '../styles/App.css';
import '../styles/Styles.scss';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Menu');

  const goToTimer = () => setCurrentPage('Timer');

  return (
    <div className="App">
      {
        currentPage === 'Timer' ?
          <Timer />
        : <Menu goToTimer={goToTimer} />
      }
    </div>
  );
}

export default App;
