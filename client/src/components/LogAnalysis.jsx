import React, { useEffect, useState } from 'react'
import { pageCardInfo } from '../data/dataArray'

function LogAnalysis() {
  const [log, setLog] = useState([])
  const [showLog, setShowLog] = useState(false)

  const [lastLogs, setLastLogs] = useState([])
  const [showLastLog, setShowLastLog] = useState(false)

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
      <div id="right-div" class="d-flex flex-column me-3 p-3 w-100 bg-grey">
        <div class="w-100 d-flex justify-content-between">
          <p class="fs-5">Log Analysis</p>
          <button
            type="button"
            id="start-analysis"
            class="btn btn-primary btn-sm w-25 "
            onClick={fetchLog}
          >
            Get log & Start Ananlysis
          </button>
        </div>

        <div className="overflow-auto">
          {showLog && (
            <div id="info-div" class=" mt-5 pt-3  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-box-arrow-right ms-3 me-3"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              <div id="log-div">
                {Object.entries(log.random_instance_data).map(
                  ([key, value]) => (
                    <div>
                      <span key={key}>
                        <span class="text-primary">{key}: </span>
                        {value}
                      </span>
                      <br></br>
                    </div>
                  ),
                )}
                <br></br>
                <span>
                  <strong>Result:</strong> {log.temp_data.answer}
                </span>
              </div>

              {showLastLog && (
                <div id="last-log-div">
                  {lastLogs.map((entry, index) => (
                    <div class="mt-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-box-arrow-right ms-3 me-3"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                      {Object.entries(entry.random_instance_data).map(
                        ([key, value]) => (
                          <span key={key}>
                            <span class="text-primary">{key}: </span>
                            {value}
                            <br></br>
                          </span>
                        ),
                      )}
                      <br></br>
                      <span>
                        <strong>Result:</strong> {log.temp_data.answer}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default LogAnalysis
