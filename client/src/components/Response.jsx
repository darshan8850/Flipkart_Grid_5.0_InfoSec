import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { DetailsModal, ProgressBar } from './componentIndex'
import { useStateContext } from '../contexts/ContextProvider'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Badge from 'react-bootstrap/Badge'

const Response = () => {
  const {
    showModal,
    setShowModal,
    showSecMeasures,
    log,
    severityScore,
    showSeveritySore,
    answer,
    showAnswer,
    fetchLog,
    knowMore,
    secMeasures,
  } = useStateContext()

  const col_class = 'col-2 border text-primary text-center p-1'
  const col_info_class = 'col-2 border text-center p-1'

  return (
    <React.Fragment>
      <div className=" rounded bg-body-tertiary p-4 m-3" id="response-div">
        <span className="fs-5">Instance</span>
        {showSeveritySore && (
          <>
            <div id="progress-bar" className="d-flex gap-3 pt-2">
              <p>Severity Score</p>
              {severityScore}{' '}
              <ProgressBar
                valueNow={Math.ceil(severityScore)}
                ariaLabel="Info example"
              />
            </div>
          </>
        )}

        <div className=" p-2">
          <div class="row mt-3 ">
            <div class={col_class}>Object ID</div>
            <div class={col_class}>Client ID</div>
            <div class={col_class}>Method</div>
            <div class={col_class}>Status Code</div>
            <div class={col_class}>Request</div>
            <div class={col_class}>Full details </div>
          </div>
          <div class="row">
            <div class={`${col_info_class}`}>{log._id}</div>
            <div class={`${col_info_class}`}>{log.client_id}</div>
            <div class={`${col_info_class}`}>{log.method}</div>
            <div class={`${col_info_class}`}>{log.status_code}</div>
            <div class={`${col_info_class} overflow-auto`}>{log.request}</div>
            <div class={`${col_info_class}`}>
              <Button
                variant="secondary"
                className="mt-3 btn-sm"
                onClick={() => setShowModal(true)}
              >
                View details
              </Button>
              <DetailsModal
                log={log}
                show={showModal}
                onHide={() => setShowModal(false)}
              />
            </div>
          </div>
          {showAnswer && (
            <>
              <div class="row">
                <div class="col-10 text-center border text-primary p-1">
                  <span class="fs-6">Analyzed Answer</span>
                </div>
                <div class="col-2 text-center border text-primary p-1">
                  <span class="fs-6">Actions</span>
                </div>
              </div>
              <div className="row">
                <div class="col-10 border p-4">{answer}</div>
                <div class="col-2 border p-4">
                  <ButtonGroup size="sm" className="mt-3">
                    <Button>Block</Button>
                    <Button onClick={knowMore}>Know More</Button>
                    <Button onClick={fetchLog}>Next</Button>
                  </ButtonGroup>
                </div>
              </div>
            </>
          )}
          {showSecMeasures && (
            <>
              <div class="row mt-3">
                <div class="col-12 text-center border text-primary p-1">
                  <span class="fs-6">Security Measures</span>
                </div>
              </div>
              <div className="row">
                <div class="col-12 border p-4">{secMeasures}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Response
