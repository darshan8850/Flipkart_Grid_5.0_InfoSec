import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStateContext } from './ContextProvider';
import { useCustomerContext } from './CustomerContext';

const CustomerInputLog = createContext();

export const CustomerInputContext = ({ children }) => {


    const {  handleCloseUpload, setShowAlert } = useStateContext()

    const [audioText, setAudioText] = useState('')
    const [customerInRules, setCustomerInRules] = useState('')

    const[inputAnswer, setInputAnswer] = useState()
    const[showInputAnswer, setShowInputAnswer ] = useState(false)

    const[showInputLog, setShowInputLog] = useState(false)

    const handleCusInputFile = (file) => {
        setShowAlert(true)
        const formData = new FormData()
        formData.append('file', file)
        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        }).then((res) => res.json())
            .then((txt) => {
                setShowAlert(false)
                setAudioText(txt)
            })
    }

    const handleCusRuleFile = (file) => {
        uploadFile(file, '/api/upload/rules')
    }

    const uploadFile = async (file, url) => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })
            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }


    const getRulesAndAnalysis = () => {
        handleCloseUpload()
        fetch('/get_rules')
            .then((res) => res.json())
            .then((res) => {
                setCustomerInRules(JSON.stringify(res))
                setShowInputLog(true)
                let prompt = 'Context: ' + audioText +
                    'Rules: ' + customerInRules +
                    'Question: what are the violations in the given context for the rules provided ?'

                console.log(prompt)
                getLLMResponse(prompt)    
            })
    }

    const getLLMResponse = (prompt) => {
        setShowAlert(true)
        fetch('/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: prompt
        })
            .then((res) => res.json())
            .then((analyzedAns) => {
                setInputAnswer(analyzedAns.answer)
                setShowInputAnswer(true)


                setShowAlert(false)
            })
            .catch((e) => {
                console.error("fetch LLM Response - " + e)
            })
    }
    return (
        <CustomerInputLog.Provider value={{
            audioText, customerInRules, 
            inputAnswer, showInputAnswer,
            showInputLog, 
            handleCusInputFile, handleCusRuleFile, getRulesAndAnalysis
        }}>
            {children}
        </CustomerInputLog.Provider>
    )
}

export const useCustomerInputContext = () => useContext(CustomerInputLog)