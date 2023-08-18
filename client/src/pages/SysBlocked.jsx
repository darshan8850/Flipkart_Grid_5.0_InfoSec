import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const SysBlocked = () => {

  const { history, fetchHistory } = useStateContext()
  const col_class = 'col border overflow-auto text-primary text-center p-1'

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <React.Fragment>
      <div id="sys-heading-div" className="p-4 d-flex justify-content-between ">
        <div className="flex flex-col">
          <span className="fs-2 mb-0">System Log Blocked Users</span>
          <span>
            System generated logs Analysis Blocked users using LLM with
            Sevierity score
          </span>
        </div>
      </div>
      <div style={{height:'80vh'}} className='overflow-auto p-3'>

      
      <div id="blocked-div" className="p-3 m-3 ">
        <div className="row border">
          <div className={col_class}>Object ID</div>
          <div className={col_class}>ID</div>
          <div className={col_class}>Client</div>
          <div className={col_class}>Method</div>
          <div className={col_class}>Status Code</div>
          <div className={col_class}>Request</div>
        </div>

        {Object.entries(history).map((entry) => (
          <div className="row border">
            <div className="col-2 overflow-auto p-1 border ">
              {entry[1]._id}
            </div>
            <div className="col-2 overflow-auto p-1 border ">{entry[1].id}</div>
            <div className="col-2 overflow-auto p-1 border ">
              {entry[1].client}
            </div>
            <div className="col-2 overflow-auto p-1 border ">
              {entry[1].method}
            </div>
            <div className="col-2 overflow-auto p-1 border ">
              {entry[1].status}
            </div>
            <div className="col-2 overflow-auto p-1 border ">
              {entry[1].request}
            </div>
          </div>
        ))}
      </div>
      </div>
    </React.Fragment>
  )
}

export default SysBlocked
