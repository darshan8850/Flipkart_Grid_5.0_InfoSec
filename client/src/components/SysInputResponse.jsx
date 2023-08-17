import React from 'react'
import { useLogInputContext } from '../contexts/LogInputContext'
import Accordion from 'react-bootstrap/Accordion'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const SysInputResponse = () => {
  const {
    inputLog,
    answer,
    showAnswer,
    knowMore,
    showKnowMore,
    fetchInputLog,
    getInputMoreDetails,
    blockInputUser
  } = useLogInputContext()

  return (
    <React.Fragment>
      <div>
        <div className=" rounded bg-body-tertiary p-4 m-3" id="response-div">
          <div className="d-flex justify-content-between">
            <span className="fs-5">Input Instance - {inputLog._id}</span>

            <div>
              <ButtonGroup size="sm" className="">
                <Button onClick={blockInputUser}>Block</Button>
                <Button onClick={getInputMoreDetails}>Know More</Button>
                <Button onClick={fetchInputLog}>Next</Button>
              </ButtonGroup>
            </div>
          </div>

          <div className=" p-2">
            <div class="row mt-3 ">
              <div class="col-12 border text-primary text-center p-1">
                Log Details
              </div>
            </div>
            <div className="row border p-2">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="bg-body-tertiary">
                    Click to view Details !
                    {console.log(inputLog._id)}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="p-4">
                      <div className="row">
                        <div className="col-2 border text-primary text-center">
                          Properties
                        </div>
                        <div className="col-10 border text-primary text-center">
                          Values
                        </div>
                      </div>
                      {Object.entries(inputLog).map(([key, value]) => (
                        <div>
                          <div className="row">
                            <div className="col-2 border">{key}</div>
                            <div className="col-10 border">{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            {showAnswer && (
              <>
                <div class="row">
                  <div class="col-12 border text-primary text-center p-1">
                    Log Analysis
                  </div>
                </div>
                <div className="row border p-2 ">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="bg-body-tertiary">
                        Input Log Analysis - Question - What are the security
                        violations based on the given rules ?
                      </Accordion.Header>
                      <Accordion.Body>{answer}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {showKnowMore && (
                    <div className=" mt-2">
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header className="bg-body-tertiary">
                            Know More
                          </Accordion.Header>
                          <Accordion.Body>{knowMore}</Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SysInputResponse
