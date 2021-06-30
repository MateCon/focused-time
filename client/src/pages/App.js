import React, { useState } from 'react';
import Menu from './Menu';
import Timer from './Timer';
import '../styles/App.css';
import '../styles/Styles.scss';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Menu');

  return (
    <div className="App">
      {
        currentPage === 'Timer' ?
          <Timer />
        : <Menu />
      }
    </div>
  );
}

export default App;
