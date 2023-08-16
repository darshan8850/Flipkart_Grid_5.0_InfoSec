import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useStateContext } from '../contexts/ContextProvider'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion'

const CustomerResponse = () => {
  const col_class = 'col border text-primary text-center p-1'
  const col_info_class = 'col border text-center p-1'
  const {
    answer,
    showAnswer,
    knowMore,
    moreInfo,
    showMoreInfo,
    customerLog,
    fetchCustomerLog,
    showButtons,
  } = useStateContext()

  return (
    <React.Fragment>
      <div className=" rounded bg-body-tertiary p-4 m-3" id="response-div">
        <div className="d-flex justify-content-between">
          <span className="fs-5">Instance</span>
          {showButtons && (
            <div>
              <ButtonGroup size="sm" className="">
                <Button onClick={knowMore}>Know More</Button>
                <Button onClick={fetchCustomerLog}>Next</Button>
              </ButtonGroup>
            </div>
          )}
        </div>

        <div className=" p-2">
          <div class="row mt-3 ">
            <div class="col-2 border text-primary text-center p-1">
              Object ID
            </div>
            <div class={col_class}>Customer Log</div>
            <div class={col_class}>Rules</div>
          </div>

          <div class="row">
            <div class="col-2 border text-center p-1">{customerLog._id}</div>
            <div class={`${col_info_class}`}>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="bg-body-tertiary">
                    Detailed Customer-CR Log
                  </Accordion.Header>
                  <Accordion.Body>{customerLog.log_transcript}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div class={`${col_info_class}`}>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="bg-body-tertiary">
                    Detailed Customer-CR Rules
                  </Accordion.Header>
                  <Accordion.Body>{customerLog.log_rules}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>

          {showAnswer && (
            <>
              <div class="row">
                <div class="col-12 text-center border text-primary p-1">
                  <span class="fs-6">Analyzed Answer</span>
                </div>
              </div>
              <div className="row">
                <div class="col-12 border p-4">{answer}</div>
              </div>
            </>
          )}

          {showMoreInfo && (
            <>
              <div class="row">
                <div class="col-12 text-center border text-primary p-1">
                  <span class="fs-6">Security Measures</span>
                </div>
              </div>
              <div className="row">
                <div class="col-12 border p-4">{moreInfo}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CustomerResponse
