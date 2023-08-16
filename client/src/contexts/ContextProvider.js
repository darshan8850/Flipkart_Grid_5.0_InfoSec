import React, { createContext, useContext, useEffect, useState } from 'react';
const StateContext = createContext();

export const ContextProvider = ({ children }) => {

  const currentColor = '#047bd5';
  const activeMenu = true

  const [log, setLog] = useState({})
  const [showLog, setShowLog] = useState(false)

  const [severityScore, setSeverityScore] = useState(0)
  const [showSeveritySore, setShowSeveritySore] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const [answer, setAnswer] = useState()
  const [showAnswer, setShowAnswer] = useState(false)

  const [secMeasures, setSecMeasures] = useState()
  const [showSecMeasures, setShowSecMeasures] = useState(false)

  const [lastLogs, setLastLogs] = useState([])
  const [showLastLog, setShowLastLog] = useState(false)

  const [flag, setFlag] = useState(false)


  // workflow - 1
  function fetchLog() {
    setShowAnswer(false)
    setShowSecMeasures(false)
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
    console.log(typeof (entries))
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
    fetch('/fetch_llm_response', {
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
      })
      .catch((e) => {
        console.error("fetch LLM Response - " + e)
      })
  }

  // work flow - 2
  function blockInstance() {
  
  }

  function knowMore() {
    if (answer) {
      prompt = answer + "\n Question: Give me indepth security redemption measures for the violated policies and their probable attacks."
      fetch('/fetch_llm_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: prompt
      })
        .then((res) => res.json())
        .then((analyzedAns) => {
          console.log(prompt)
          console.log(analyzedAns)
          setSecMeasures(analyzedAns.answer)
          setShowSecMeasures(true)
        })
        .catch((e) => {
          console.error("fetch LLM Response - " + e)
        })
    }
  }

  return (
    <StateContext.Provider value={{
      currentColor, activeMenu,
      showModal, setShowModal,
      log, showLog,
      lastLogs, showLastLog,
      showSecMeasures, setShowSecMeasures,
      severityScore, setSeverityScore,
      showSeveritySore, setShowSeveritySore,
      showAlert, setShowAlert,
      answer, setAnswer,
      showAnswer, knowMore,
      secMeasures, setSecMeasures,
      flag, setFlag,
      fetchLog
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
