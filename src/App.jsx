import React from 'react'
import { LeftPannel } from './components/LeftPannel';
import { MainPannel } from './components/MainPannel';
import { RightPannel } from './components/RightPannel';
import app from './styles/app.module.css'

function App() {
  return (
    <div className={app.app} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gap: '1rem'
    }}>
      <LeftPannel />
      <MainPannel />
      <RightPannel />
      </div>
  );
}

export default App
