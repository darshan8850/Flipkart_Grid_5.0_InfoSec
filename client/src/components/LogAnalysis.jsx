import React, { useEffect, useState } from 'react'
import { pageCardInfo } from '../data/dataArray'

function LogAnalysis() {

  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [])

  const [log, setLog] = useState({})
  const [showLog, setShowLog] = useState(false);
  function fetchLog() {
    fetch('/getlog')
      .then(res => res.json())
      .then(entries => setLog(entries))
    setShowLog(true)
    document.getElementById('start-analysis').disabled = true;
  }


  return (
    <React.Fragment>
      <div id="right-div" class="d-flex flex-column mt-3 overflow-hidden me-3 p-3" style={{ width: '100%' }}>
      <p class="fs-5">Log Analysis</p>
        <div id="info-div" class="d-flex flex justify-content-between">
          <p>Session: {currentTime.toLocaleTimeString()} </p>
          <button type="button" id="start-analysis"class="btn btn-primary btn-sm w-25" onClick={fetchLog}>Get log & Start Ananlysis</button>
        </div>
        {showLog && (<div id="info-div" class=" mt-5 pt-3 d-flex overflow-auto border w-100 h-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-box-arrow-right ms-3 me-3" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
          </svg>
          <div id="log-analysis" class="d-flex flex-column w-100 ">
            <span><span class="text-primary">Id:</span> {log._id}</span>
            <span><span class="text-primary">Client id: </span>{log.client_id}</span>
            <span><span class="text-primary">Date & time:</span> {log.date_time} </span>
            <span><span class="text-primary">Method:</span> {log.method} </span>
            <span><span class="text-primary">request: </span> {log.request}</span>
            <span><span class="text-primary">Status code:</span> {log.status_code} </span>
            <span><span class="text-primary">Size: </span>{log.size} </span>
            <span><span class="text-primary">Referer:  </span>{log.referer}</span>
            <span><span class="text-primary">User system type:</span> {log.user_system_specs} </span>
            <span><span class="text-primary">Type:</span>  {log.type}</span>
            <span><span class="text-primary">Two factor authentication: </span>{log.two_factor_authentication} </span>
            <span><span class="text-primary">Multi factor authentication: </span> {log.multi_factor_authentication}</span>
            <span><span class="text-primary">Security monitoring:</span>  {log.security_monitoring}</span>
            <span><span class="text-primary">Secure file uploads policies properties secure file name: </span> {log.secure_file_uploads_policies__properties__secure_file_name}</span>
            <span><span class="text-primary">Secure file uploads policies properties malware scan: </span>{log.secure_file_uploads_policies__properties__malware_scan}</span>
            <span><span class="text-primary">Secure file uploads policies properties audit logging: </span>{log.secure_file_uploads_policies__properties__audit_logging}</span>
            <span><span class="text-primary">Secure file uploads policies properties sandboxing:</span> {log.secure_file_uploads_policies__properties__sandboxing}</span>
            <span><span class="text-primary">Secure file uploads policies properties encryption in transit:</span> {log.secure_file_uploads_policies__properties__encryption__in_transit}</span>
            <span><span class="text-primary">Secure file uploads policies properties encryption at rest:</span> {log.secure_file_uploads_policies__properties__encryption__at_rest}</span>
            <span><span class="text-primary">Ssl encryption required: </span> {log.ssl_encryption_required}</span>
            <span><span class="text-primary">Permissions: </span> {log.permissions}</span>
            <span><span class="text-primary">Explicite allowed resources:  </span>{log.explicite_allowed_resources}</span>
            <span><span class="text-primary">Other resources: </span>{log.other_resources} </span>

            <span> summary </span>
          </div>
        </div>)}
      </div>
    </React.Fragment>
  )
}

export default LogAnalysis
