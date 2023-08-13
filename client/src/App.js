import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { pageCardInfo } from './data/dataArray'
import { Route, Routes } from 'react-router-dom'
import PageCard from './components/PageCard'
import DashBoard from './components/DashBoard'
import LogAnalysis from './components/LogAnalysis'

function App() {
  return (
    <React.Fragment>

      <nav class="navbar navbar-expand-lg shadow-sm p-3 position-sticky bg-body-tertiary rounded overflow-hidden">
        <div class="container-fluid">
          <a class="navbar-brand">Compliance Monitoring and Enforcement through Log Analysis using LLM ( Infosec Engineering )</a>
        </div>
      </nav>
      <div id="main-div" class="d-flex position-sticky">
        <div id="left-div" class="d-flex flex-column ms-3 me-3  border-end p-3 " style={{ width: '13%', height: '90vh' }}>
          {pageCardInfo.map((e, index) => (
            <PageCard
              key = {index}
              tag={e.tag}
              link={e.link}
              svg={e.svg} />
          ))}
        </div>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/logAnalysis" element={<LogAnalysis />} />
        </Routes>
      </div>
    </React.Fragment>

  );
}

export default App