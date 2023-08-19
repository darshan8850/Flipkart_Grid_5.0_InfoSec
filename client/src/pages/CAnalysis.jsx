import React from 'react'
import Alert from '@mui/material/Alert'
import Button from 'react-bootstrap/Button'
import { CustomerResponse, UploadFile } from '../components/componentIndex'
import { useStateContext } from '../contexts/ContextProvider'
import Modal from 'react-bootstrap/Modal'
import { useCustomerContext } from '../contexts/CustomerContext'
import { useCustomerInputContext } from '../contexts/CustomerInputContext'
import CusInputRes from '../components/CusInputRes'
const CAnalysis = () => {
  const { fetchCustomerLog, showCustomerLog } = useCustomerContext()
  const {
    handleCusInputFile,
    handleCusRuleFile,
    getRulesAndAnalysis,
    showInputLog,
  } = useCustomerInputContext()
  const {
    showAlert,
    showUpload,
    handleShowUpload,
    handleCloseUpload,
  } = useStateContext()

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
            Analysing Customer - Company Respresentative Logs ...
          </Alert>
        )}

        <div
          id="sys-heading-div"
          className="p-4 d-flex justify-content-between"
        >
          <div className="flex flex-col">
            <span className="fs-2 mb-0">
              Customer-Customer Representative Analysis
            </span>
            <span>
              Customer-Customer Representative generated logs Analysis using LLM
            </span>
          </div>

          <div id="button-groups" className="p-4">
            <button
              type="button"
              class="btn btn-primary btn-sm me-3"
              onClick={fetchCustomerLog}
            >
              Get Random Instance
            </button>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              onClick={handleShowUpload}
            >
              Upload Customer-CR log
            </button>
            <Modal
              className="mt-5 pt-5 mb-5"
              show={showUpload}
              onHide={handleCloseUpload}
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <UploadFile
                  title="Upload Files (AUDIO, MPEG)"
                  allowedFileTypes={['audio/mpeg']}
                  onSubmit={handleCusInputFile}
                />
                <UploadFile
                  title="Upload Rules (.TXT )"
                  allowedFileTypes={['text/plain', 'text/csv']}
                  onSubmit={handleCusRuleFile}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={getRulesAndAnalysis}>
                  Start Input Analysis
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
            {showCustomerLog && <CustomerResponse />}
            {showInputLog && <CusInputRes />}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CAnalysis
