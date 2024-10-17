import React from 'react';
import Navbar from './components/Navbar';
import IDE from './components/IDE';
import ChatInterface from './components/ChatInterface';
import Chat from './components/Chat';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <Navbar />
            <div className="main-content">
                <IDE />
                <ChatInterface />
            </div>
            <Chat />
        </div>
    );
}

export default App;
