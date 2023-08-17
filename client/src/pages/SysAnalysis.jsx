import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import { SystemResponse, UploadFile } from '../components/componentIndex'
import { useStateContext } from '../contexts/ContextProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SysInputResponse from '../components/SysInputResponse'
import { useLogInputContext } from '../contexts/LogInputContext'

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
  } = useStateContext()

  const {showInputLog, fetchInputLog} = useLogInputContext()



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
            <span className="fs-2 mb-0">System Log Analysis</span>
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

            
            <button
              type="button"
              class="btn btn-primary btn-sm"
              onClick={fetchInputLog}
            >
              Get Input Log
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
            {showLog && <SystemResponse />}
            {showInputLog && <SysInputResponse/>}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SysAnalysis
