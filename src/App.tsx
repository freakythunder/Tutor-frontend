import React from 'react';
import Navbar from './components/Navbar';
import ResizableContainer from './components/ResizableContainer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="appContainer">
      <Navbar />
      <div className="mainContainer">
        <ResizableContainer />
      </div>
    </div>
  );
};

export default App;
