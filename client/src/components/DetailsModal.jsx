import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const DetailsModal = (props) => {
  const { log } = props
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className='fs-5'></p>Log Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {Object.entries(log).map(([key, value]) => (
            <>
              <div class="row border">
                <div className="col-8 items-center">
                  {key}
                </div>
                <div className="col-4 overflow-auto">
                  {value}
                </div>
              </div>
            </>
          ))}
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default DetailsModal
