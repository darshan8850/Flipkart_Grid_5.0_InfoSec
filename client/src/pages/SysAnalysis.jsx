import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import { SystemResponse, UploadFile } from '../components/componentIndex'
import { useStateContext } from '../contexts/ContextProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const SysAnalysis = () => {
  const {
    showBlockedAlert,
    showLog,
    fetchLog,
    showAlert,
    show,
    handleClose,
    handleShow,
    handleRuleFileSubmit,
    handleRegularFileSubmit,
    showUpload,
    handleShowUpload,
    handleCloseUpload,
    uploadTextData, setLogInput, setRuleInput, setPromptInput,
  } = useStateContext()


  function manageInput() {
    // let logInput = document.getElementById("text-log").value
    // setLogInput(logInput)
    // let ruleInput = document.getElementById("text-rules").value
    // setRuleInput(ruleInput)
    // let promptInput  = document.getElementById("text-prompt").value
    // setPromptInput(promptInput)

    // uploadTextData()
   
  }

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
            style={{ widht: '10vw', height: '5vh' }}
            severity="info"
          >
            Analysing System Logs
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
            </Modal>

            {/* upload text */}
            <button
              type="button"
              class="btn btn-primary btn-sm"
              onClick={handleShow}
            >
              Upload Text log
            </button>
            <Modal className="mt-5 mb-5" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Text Input</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Required*</p>
                <div class="input-group-sm mb-4">
                  <span class="input-group-text mt-1 mb-1">Log*</span>
                  <textarea
                    id="text-log"
                    class="form-control"
                    aria-label="With textarea"
                    // onChange={setLogInput(event.target.value)}
                  ></textarea>
                </div>
                <div class="input-group-sm mb-4">
                  <span class="input-group-text mt-1 mb-1">Rules*</span>
                  <textarea
                    id="text-rules"
                    class="form-control"
                    aria-label="With textarea"
                    // onChange={setRuleInput(event.target.value)}
                  ></textarea>
                </div>
                <div class="input-group-sm">
                  <span class="input-group-text mt-1 mb-1">Prompt*</span>
                  <textarea
                    id="text-prompt"
                    class="form-control"
                    aria-label="With textarea"
                    // onChange={setPromptInput(event.target.value)}
                  ></textarea>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn-sm" variant="primary" onClick={manageInput}>
                  Start Analysis
                </Button>
              </Modal.Footer>
            </Modal>
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
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SysAnalysis
