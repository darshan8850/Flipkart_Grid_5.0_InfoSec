import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useStateContext } from '../contexts/ContextProvider'
import { useCustomerContext } from '../contexts/CustomerContext'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion'

const CustomerResponse = () => {
  const col_className = 'col border text-primary text-center p-1'
  const col_info_className = 'col border text-center p-1'
  const {
    answer,
    showAnswer,
    moreInfo,
    showMoreInfo,

    showButtons,
  } = useStateContext()

  const { fetchCustomerLog, customerLog, customerKnowMore } = useCustomerContext()

  return (
    <React.Fragment>
      <div className=" rounded bg-body-tertiary p-4 m-3" id="response-div">
        <div className="d-flex justify-content-between">
          <span className="fs-5">Instance</span>
          {showButtons && (
            <div>
              <ButtonGroup size="sm" className="">
                <Button onClick={customerKnowMore}>Know More</Button>
                <Button onClick={fetchCustomerLog}>Next</Button>
              </ButtonGroup>
            </div>
          )}
        </div>

        <div className=" p-2">
          <div className="row mt-3 ">
            <div className="col-2 border text-primary text-center p-1">
              Object ID
            </div>
            <div className={col_className}>Customer Log</div>
            <div className={col_className}>Rules</div>
          </div>

          <div className="row">
            <div className="col-2 border text-center p-1 overflow-auto">
              {customerLog._id}
            </div>
            <div className={`${col_info_className}`}>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="bg-body-tertiary">
                    Detailed Customer-CR Log
                  </Accordion.Header>
                  <Accordion.Body>{customerLog.log_transcript}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className={`${col_info_className}`}>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="bg-body-tertiary">
                    Detailed Customer-CR Rules
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row text-center border text-primary p-2">
                      Policies
                    </div>
                    {Object.entries(customerLog.log_rules).map((entry) => (
                      <div className="row border text-justify p-2">{entry}</div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>

          {showAnswer && (
            <>
              <div className="row">
                <div className="col-12 text-center border text-primary p-2">
                  <span className="fs-6">Customer Transcript Analysis</span>
                </div>
              </div>
              <div className="row border p-2">
                <div className="mb-2">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="bg-body-tertiary">
                        Analyzed Answer
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row ">
                          <div className="col overflow-aut">{answer}</div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                {showMoreInfo && (
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="bg-body-tertiary">
                        Know More - ( Security Measures )
                      </Accordion.Header>
                      <Accordion.Body>{moreInfo}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CustomerResponse
