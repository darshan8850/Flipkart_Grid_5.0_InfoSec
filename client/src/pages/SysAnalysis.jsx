import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { Response } from '../components/componentIndex'
import { useStateContext } from '../contexts/ContextProvider'

const SysAnalysis = () => {
  const { showLog, fetchLog, showAlert } = useStateContext()

  return (
    <React.Fragment>
      <div
        className="border overflow-hidden"
        id="sysanalysis"
        style={{ widht: '90vw', height: '94vh' }}
      >
        {showAlert && (
          <Alert
            variant="primary"
            className=" z-3  position-absolute top-20 start-50 translate-middle"
            style={{ widht: '10vw', height: '5vh' }}
          >
            <p>Analysing System logs ... </p>
          </Alert>
        )}

        <div
          id="sys-heading-div"
          className="p-4 d-flex justify-content-between"
        >
          <div className="flex flex-col">
            <span className="fs-2 mb-0">System Analysis</span>
            <span>
              System generated logs Analysis using LLM with Sevierity score
            </span>
          </div>

          <div id="button-groups" className="p-4">
            <button
              type="button"
              class="btn btn-primary btn-sm me-3"
              onClick={fetchLog}
            >
              Get Random Instance
            </button>
            <button type="button" class="btn btn-primary btn-sm">
              Upload System log
            </button>
          </div>
        </div>

        <div
          id="analysis div"
          className="overflow-hidden"
          style={{ widht: '100%', height: '100%' }}
        >
          <div
            id="response-div"
            className=" m-2 overflow-auto "
            style={{ widht: '90vw', height: '85%' }}
          >
            {showLog && <Response />}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SysAnalysis
