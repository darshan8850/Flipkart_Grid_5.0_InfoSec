import './App.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { pageCardInfo } from './data/dataArray'
import { Route, Routes } from 'react-router-dom'
import PageCard from './components/PageCard'
import HomePage from './components/HomePage'
import LogAnalysis from './components/LogAnalysis'


function App() {
  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg shadow-sm p-3  bg-body-tertiary rounded">
        <div class="container-fluid">
          <a class="navbar-brand">Compliance Monitoring and Enforcement through Log Analysis using LLM ( Infosec Engineering )</a>
        </div>
      </nav>
      <div id="main-div" class="d-flex">
        <div id="left-div" class="d-flex flex-column ms-3 me-3 border-end p-3 bg-body-tertiary" style={{ width: '13%', height: '90vh' }}>
          {pageCardInfo.map((e, index) => (
            <PageCard
              tag={e.tag}
              link={e.link}
              svg={e.svg} />
          ))}
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logAnalysis" element={<LogAnalysis />} />
        </Routes>
      </div>
    </React.Fragment>

  );
}

export default App;
