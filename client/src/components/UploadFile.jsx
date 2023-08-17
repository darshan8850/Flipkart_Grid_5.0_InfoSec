import React, { useState } from 'react'

const UploadFile = ({ title, allowedFileTypes, onSubmit }) => {
  
    const [file, setFile] = useState('')

  const isValidFileType = (file) => {
    return allowedFileTypes.includes(file.type)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file || !isValidFileType(file)) {
      console.log('Invalid file type. Please select a valid file.')
      return
    }

    onSubmit(file)
  }

  return (
    <React.Fragment>
      <div className="border p-4 mb-4">
        <h2 className="fs-5">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept={allowedFileTypes.join(', ')}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default UploadFile
