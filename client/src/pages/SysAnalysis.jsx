import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css';

const SysAnalysis = () => {
  const [log, setLog] = useState([])
  const [showLog, setShowLog] = useState(false)

  const [lastLogs, setLastLogs] = useState([])
  const [showLastLog, setShowLastLog] = useState(false)

  useEffect(() => {
    fetchLog()
  }, [])

  function fetchLog() {
    fetch('/testing')
      .then((res) => res.json())
      .then((entries) => {
        setLastLogs((prevLastLogs) => [...prevLastLogs, log])
        if (lastLogs.length > 0 && !showLastLog) {
          lastLogs.shift()
          setShowLastLog(true)
        }
        setLog(entries)
        setShowLog(true)
      })
  }

  return (
    <React.Fragment>
      <div>
        {showLog && (
          <div
            className="m-8 flex "
            style={{ overflow: 'auto', maxWidth: '90vw' }}
          >
            <div>
              <strong>Instance: </strong>
              {Object.entries(log.random_instance_data).map(([key, value]) => (
                <p  key={key}>{`${key}: ${value}`}</p>
              ))}
            </div>

            <div >
              <strong>
                Result:<br></br>
              </strong>
              <div className='typewriter'>{log.temp_data.answer}</div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default SysAnalysis
