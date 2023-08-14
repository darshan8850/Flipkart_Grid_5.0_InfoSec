import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import './App.css';

import { Navbar, Sidebar } from './components/componentIndex'
import { CAnalysis, CHistory, Dashboard, SysHistory, SysAnalysis } from './pages/pageIndex'

function App() {
  const activeMenu = true
  return (
    <BrowserRouter>
      <div className="flex">
        <div className='sidebar dark:bg-secondary-dark-bg bg-white'>
          <Sidebar />
        </div>
        <div style={{width:'100vw'}}>
          <Navbar />
          <div >
            <Routes>
              {/* dashboard */}
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              {/* analysis chatbox */}
              <Route path='/System_Analysis' element={<SysAnalysis />} />
              <Route path='/Customer_Analysis' element={<CAnalysis />} />
              {/* history */}
              <Route path='/System_History' element={<SysHistory />} />
              <Route path='/Customer_History' element={<CHistory />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App