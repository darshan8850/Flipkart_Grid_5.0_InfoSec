import React, { createContext, useContext, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider'

const LogInput = createContext();

export const LogInputContext = ({ children }) => {

    const [inputLog, setInputLog] = useState([])
    const [showInputLog, setShowInputLog] = useState(false)

    const [inputRule, setInputRule] = useState()

    const [answer, setAnswer] = useState()
    const [showAnswer, setShowAnswer] = useState(false)

    const [knowMore, setKnowMore] = useState()
    const [showKnowMore, setShowKnowMore] = useState(false)

    const { setShowAlert, setShowButtons, setShowBlockedAlert } = useStateContext()

    const fetchInputLog = () => {
        try {
            setShowAlert(true)
            fetch('/input_random_instance')
                .then((res) => res.json())
                .then((entry) => {
                    setInputLog(entry)
                    setShowInputLog(true)
                    //fetch rules
                    getInputLLMResponse(entry)
                })
        } catch (e) {
            console.log('fetch input log - ' + e)
        }

    }

    const getInputLLMResponse = (entry) => {
        try {
            let temp_prompt = entry + "\n rules: " + inputRule +
                "\n Question: what are the violation mentioned in accordance to given rules ?"

            fetch('/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: temp_prompt
            })
                .then((res) => res.json())
                .then((analyzedAns) => {
                    setAnswer(analyzedAns.answer)
                    setShowAnswer(true)
                    setShowButtons(true)
                    setShowAlert(false)
                })
        } catch (e) {
            console.log("get input LLM Response " + e)
        }
    }

    const getInputMoreDetails = () => {
        try {
            let temp_prompt = answer +
                '\n Give me indepth security redemption measures for the violated policies. '
            setShowAlert(true)
            fetch('/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: temp_prompt
            })
                .then((res) => res.json())
                .then((analyzedAns) => {
                    setKnowMore(analyzedAns.answer)
                    setShowAlert(false)
                    setShowKnowMore(true)
                })
        } catch (e) {
            console.log("get input LLM Response " + e)
        }
    }

    const blockInputUser = () => {
        const block_user = {
            "id": inputLog._id,
            "client": inputLog.client,
            "method": inputLog.method,
            "status": inputLog.status,
            "request": inputLog.request
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
                    fetchInputLog()
                }, 3000);
            })

    }

    return (<LogInput.Provider value={{
        inputLog, showInputLog,
        answer, showAnswer,
        knowMore, showKnowMore, 
        fetchInputLog, getInputMoreDetails, blockInputUser
    }}>
        {children}
    </LogInput.Provider>)
}

export const useLogInputContext = () => useContext(LogInput);