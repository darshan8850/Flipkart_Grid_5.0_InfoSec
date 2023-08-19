import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import { SystemResponse, UploadFile } from '../components/componentIndex'
import { useStateContext } from '../contexts/ContextProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SysInputResponse from '../components/SysInputResponse'
import { useLogInputContext } from '../contexts/LogInputContext'
import Accordion from 'react-bootstrap/Accordion'

const SysAnalysis = () => {
  const {
    showBlockedAlert,
    showLog,
    fetchLog,
    showAlert,
    handleRuleFileSubmit,
    handleRegularFileSubmit,
    showUpload,
    handleShowUpload,
    handleCloseUpload,
    showAutoBlock,
    handleShowBlock,
    handleCloseBlock,
    rangeVal,
    setVal,
    setTrue,
  } = useStateContext()

  const { showInputLog, fetchInputLog } = useLogInputContext()

  return (
    <React.Fragment>
      <div
        className="border overflow-hidden"
        id="sysanalysis"
        style={{ widht: '90vw', height: '94vh' }}
      >
        {showAlert && (
          <Alert
            className=" z-3  position-absolute top-20 start-50 translate-middle"
            severity="info"
          >
            Analysing System Logs ...
          </Alert>
        )}

        {showBlockedAlert && (
          <Alert
            className=" z-3  position-absolute top-40 start-50 translate-middle"
            severity="error"
          >
            User Blocked
          </Alert>
        )}

        <div
          id="sys-heading-div"
          className="p-4 d-flex justify-content-between"
        >
          <div className="flex flex-col">
            <span className="fs-2 mb-0">System Log Analysis</span>
            <span>
              System generated logs Analysis using LLM with severity score
            </span>
          </div>

          <div id="button-groups" className="p-4 d-flex">
            <div>
              <button
                type="button"
                class="btn btn-primary btn-sm me-3"
                onClick={fetchLog}
              >
                Get Random Instance
              </button>

              <button
                type="button"
                class="btn btn-primary me-3 btn-sm"
                onClick={handleShowUpload}
              >
                Upload log files
              </button>
              <Modal
                className="mt-5 mb-5"
                show={showUpload}
                onHide={handleCloseUpload}
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <UploadFile
                    title="Upload Files (PDF, CSV, TXT)"
                    allowedFileTypes={[
                      'application/pdf',
                      'text/csv',
                      'text/plain',
                    ]}
                    onSubmit={handleRegularFileSubmit}
                  />
                  <UploadFile
                    title="Upload Rules"
                    allowedFileTypes={['text/plain', 'text/csv']}
                    onSubmit={handleRuleFileSubmit}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={fetchInputLog}>Start Input Analysis</Button>
                </Modal.Footer>
              </Modal>

              <button
                type="button"
                class="btn btn-primary btn-sm "
                onClick={handleShowBlock}
              >
                Auto Block
              </button>
              <Modal
                className="mt-5 mb-5 "
                show={showAutoBlock}
                onHide={handleCloseBlock}
              >
                <Modal.Header closeButton>Auto Block</Modal.Header>
                <Modal.Body>
                  <div className="bg-dark-subtle p-5">
                   
                    <div>
                      <p> Range Val: {rangeVal}</p>
                    </div>
                    <div className="d-flex">
                      
                      <input
                        type="range"
                        class="form-range "
                        min="0"
                        max="10"
                        step="0.5"
                        id="customRange3"
                        defaultValue="0"
                        onChange={(e) => setVal(e.target.value)}
                      ></input>
                    </div>

                    <div className="d-flex mt-3">
                      <input
                        class="form-check-input me-3"
                        type="checkbox"
                        value="false"
                        id="flexCheckDefault"
                        onChange={(e) => setTrue(e.target.checked)}
                      ></input>

                      <label class="form-check-label " for="flexCheckDefault">
                        Set Auto Blocking
                      </label>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
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
            {showLog && <SystemResponse />}
            {showInputLog && <SysInputResponse />}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SysAnalysis
