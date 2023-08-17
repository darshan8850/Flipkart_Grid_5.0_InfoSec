import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import './App.css';

import { Navbar, Sidebar } from './components/componentIndex'
import { CAnalysis, CHistory, Dashboard, SysHistory, SysAnalysis, SysBlocked } from './pages/pageIndex'


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
              {/* System */}
              <Route path='/' element={<SysAnalysis />} />
              <Route path='/System_Analysis' element={<SysAnalysis />} />
              <Route path='/System_History' element={<SysHistory />} />
              <Route path='/Blocked_users' element={<SysBlocked />} />
              {/* Customer */}
              <Route path='/Customer_Analysis' element={<CAnalysis />} />
              <Route path='/Customer_History' element={<CHistory />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App