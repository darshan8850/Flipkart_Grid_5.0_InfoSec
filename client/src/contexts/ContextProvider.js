import React, { createContext, useContext, useState, useEffect } from 'react';
import { customer_rules } from '../data/CentralData';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

  let temp_score = 0;
  const currentColor = '#0d6efd';
  const activeMenu = true

  const [answer, setAnswer] = useState()
  const [showAnswer, setShowAnswer] = useState(false)

  const [moreInfo, setMoreInfo] = useState()
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const [log, setLog] = useState({})
  const [showLog, setShowLog] = useState(false)

  const [severityScore, setSeverityScore] = useState(0)
  const [showSeverityScore, setShowSeverityScore] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const [history, setHistory] = useState({})
  const [showHistory, setShowHistory] = useState(false)
  const [customerLog, setCustomerLog] = useState({})
  const [showCustomerLog, setShowCustomerLog] = useState(false)

  const [showButtons, setShowButtons] = useState(false)
  const [showBlockedAlert, setShowBlockedAlert] = useState(false)


  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [showUpload, setShowUpload] = useState(false)
  const handleShowUpload = () => setShowUpload(true)
  const handleCloseUpload = () => setShowUpload(false)

  const [logInput, setLogInput] = useState()
  const [ruleInput, setRuleInput] = useState()
  const [promptInput, setPromptInput] = useState()

  const [graphValues, setGraphValues] = useState([])
  const [graphTag, setGraphTag] = useState([])

  const [showAutoBlock, setShowAutoBlock] = useState(false)
  const handleShowBlock = () => setShowAutoBlock(true)
  const handleCloseBlock = () => setShowAutoBlock(false)

  const [autoBlock, setAutoBlock] = useState(false)
  const [rangeVal, setRangeVal] = useState()

  const [flag, setFlag] = useState(false)

  function setTrue(c) {
    setAutoBlock(c)
  }

  function setVal(val) {
    setRangeVal(val)
  }
  
  useEffect(() => {
    if(flag && autoBlock && severityScore>=rangeVal) {
      console.log("bada hai sv- " + severityScore + " rg- " + rangeVal) 
      blockUser()
      setFlag(false)
    }
  },[severityScore, flag])

  // workflow - 1 ( For system generated log )
  function fetchLog() {
    setShowAnswer(false)
    setShowMoreInfo(false)
    fetch('/random_instance')
      .then((res) => res.json())
      .then((entries) => {
        setLog(entries)
        setShowLog(true)
        getScore(entries)
        getPromptAndRes(entries)
      })
      .catch((e) => {
        console.error("fetch log - " + e)
      })
  }

  function getScore(entries) {
    fetch('/get_score_calculation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entries)
    })
      .then((res) => res.json())
      .then((entry) => {
        setSeverityScore(entry.score)
        setGraphValues(entry.graph_list)
        setGraphTag(entry.violated_policies)
        setShowSeverityScore(true);
      })
      .catch((e) => {
        console.error("getScore - " + e)
      })
  }

  function getPromptAndRes(entries) {
    fetch('/create_prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entries)
    })
      .then((res) => res.json())
      .then((prompt) => {
        setShowAlert(true)
        fetchLlmResponse(prompt)
      })
      .catch((e) => {
        console.log("get Prompt And Res - " + e)
      })
  }

  function fetchLlmResponse(prompt) {
    fetch('/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: prompt
    })
      .then((res) => res.json())
      .then((analyzedAns) => {
        setShowAlert(false)
        setAnswer(analyzedAns.answer)
        setShowAnswer(true)
        setShowButtons(true)
        setFlag(true)
      })
      .catch((e) => {
        console.error("fetch LLM Response - " + e)
      })
  }

  function knowMore() {
    if (answer) {
      setShowAlert(true)
      prompt = answer + "\n Question: Give me indepth security redemption measures for the violated policies and their probable attacks."
      fetch('/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: prompt
      })
        .then((res) => res.json())
        .then((analyzedAns) => {
          setMoreInfo(analyzedAns.answer)
          setShowMoreInfo(true)
          setShowAlert(false)
        })
        .catch((e) => {
          console.error("fetch LLM Response - " + e)
        })
    }
  }

  function blockUser() {
    if (log === null) {
      return "NULL LOG"
    }
    const block_user = {
      "id": log._id,
      "client": log.client,
      "method": log.method,
      "status": log.status,
      "request": log.request
    }
    fetch('/block_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(block_user)
    })
      .then((res) => res.json())
      .then((res) => {
        setShowBlockedAlert(true)
        setTimeout(() => {
          setShowBlockedAlert(false)
          fetchLog()
        }, 3000);
      })
      .catch((e) => {
        console.error("getScore - " + e)
      })

  }

  function fetchHistory() {
    setShowHistory(true)
    fetch('/get_blocked_user')
      .then((res) => res.json())
      .then((entries) => {
        setHistory(entries)
      })
      .catch((e) => {
        console.error("fetch history - " + e)
      })
  }

  // uploads
  const handleRegularFileSubmit = async (file) => {
    await uploadFile(file, '/api/upload')
  }

  const handleRuleFileSubmit = async (file) => {
    await uploadFile(file, '/api/upload/rules')
  }

  const uploadFile = async (file, url) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }



  // workflow - 2 ( For customer log)
  function fetchCustomerLog() {
    // setShowAnswer(false)
    // setShowMoreInfo(false)
    // fetch('/customer_random_instance')
    //   .then((res) => res.json())
    //   .then((entries) => {
    //     entries.log_rules = JSON.stringify(customer_rules)
    //     setCustomerLog(entries)
    //     setShowCustomerLog(true)
    //     getCustomerPromptAndRes(entries)
    //   })
  }

  function getCustomerPromptAndRes(entries) {
    // setShowAlert(true)
    // let prompt = `convo: ${entries.log_transcript} \n 
    // rules: ${JSON.stringify(customer_rules)} \n question: Is there any violations 
    // in the given conversation for above rules mentioned ?`
    // fetchLlmResponse(prompt)
  }

  return (
    <StateContext.Provider value={{
      currentColor, activeMenu,
      showModal, setShowModal,
      log, showLog,
      severityScore, setSeverityScore,
      showSeverityScore, setShowSeverityScore,
      showAlert, setShowAlert,
      answer, setAnswer,
      showAnswer, knowMore,
      moreInfo, setMoreInfo,
      showMoreInfo, setShowMoreInfo,
      fetchLog,setShowAnswer,fetchLlmResponse,
      fetchCustomerLog, showCustomerLog, customerLog, showButtons, setShowButtons, blockUser,
      showBlockedAlert, setShowBlockedAlert, showHistory, history, fetchHistory,
      show, setShow, handleClose, handleShow, uploadFile, handleRuleFileSubmit, handleRegularFileSubmit,
      showUpload, setShowUpload, handleShowUpload, handleCloseUpload,
      setLogInput, setRuleInput, setPromptInput, graphValues, graphTag, showAutoBlock, setShowAutoBlock,
      handleShowBlock, handleCloseBlock, rangeVal, setRangeVal, setTrue, setVal
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
