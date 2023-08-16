import React, { createContext, useContext, useEffect, useState } from 'react';
const StateContext = createContext();

export const ContextProvider = ({ children }) => {

  const currentColor = '#047bd5';
  const activeMenu = true

  const [answer, setAnswer] = useState()
  const [showAnswer, setShowAnswer] = useState(false)

  const [moreInfo, setMoreInfo] = useState()
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const [log, setLog] = useState({})
  const [showLog, setShowLog] = useState(false)

  const [severityScore, setSeverityScore] = useState(0)
  const [showSeveritySore, setShowSeveritySore] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const [customerLog, setCustomerLog] = useState({})
  const [showCustomerLog, setShowCustomerLog] = useState(false)

  const [showButtons, setShowButtons] = useState(false)


  // workflow - 1 ( For system generated log )
  function fetchLog() {
    setShowAnswer(false)
    setMoreInfo(false)
    fetch('/random_instance')
      .then((res) => res.json())
      .then((entries) => {
        setLog(entries)
        setShowLog(true)
        getScore(entries)
        getPromptAndRes(entries)
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
      .then((score) => {
        setSeverityScore(score)
        setShowSeveritySore(true);
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
        console.log(prompt)
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
      })
      .catch((e) => {
        console.error("fetch LLM Response - " + e)
      })
  }

  function knowMore() {
    setShowAlert(true)
    if (answer) {
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

  // workflow - 2 ( For customer log)
  function fetchCustomerLog() {
    setShowAnswer(false)
    setShowMoreInfo(false)
    fetch('/customer_random_instance')
      .then((res) => res.json())
      .then((entries) => {
        setCustomerLog(entries)
        setShowCustomerLog(true)
        getCustomerPromptAndRes(entries)
      })
  }

  function getCustomerPromptAndRes(entries) {
    let prompt = `convo: ${entries.log_transcript} \n 
    rules: ${entries.log_rules} \n question: Is there any violations 
    in the given convo for rules mentioned ?`
    fetchLlmResponse(prompt)
  }

  return (
    <StateContext.Provider value={{
      currentColor, activeMenu,
      showModal, setShowModal,
      log, showLog,
      severityScore, setSeverityScore,
      showSeveritySore, setShowSeveritySore,
      showAlert, setShowAlert,
      answer, setAnswer,
      showAnswer, knowMore,
      moreInfo, setMoreInfo,
      showMoreInfo, setShowMoreInfo,
      fetchLog,
      fetchCustomerLog, showCustomerLog , customerLog, showButtons, setShowButtons
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
