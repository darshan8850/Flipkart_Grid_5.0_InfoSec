import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStateContext } from './ContextProvider';

const CustomerInputLog = createContext();

export const CustomerInputContext = ({ children }) => {


    const{fetchLlmResponse, setShowAnswer, setShowMoreInfo, setShowAlert, setMoreInfo} = useStateContext()
    
    const [audioText, setAudioText] = useState()
    const [customerInRules, setCustomerInRules] = useState()
    const [startFlag, setStartFlag] = useState(false)

    const handleCusInputFile =  (file) => {
        uploadFile(file, '/api/upload')
        .then((txt) => {
            setAudioText(txt)
            console.log(audioText)
        })
    }

    const handleCusRuleFile =  (file) => {
        uploadFile(file, '/api/upload/rules')
        setStartFlag(true)
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

    const getRules = () => {
        fetch('/get_rules')
            .then((res) => res.json())
            .then((res) => {
                setCustomerInRules(JSON.stringify(res))
            })
    }

    useEffect(() => {
        if(startFlag) {
            getRules(); 
            setShowAlert(true);
            let prompt = 'Context: ' + audioText + 
            'Rules: ' + customerInRules + 
            '\n Question: are there any violations in the given context based on the rules provided ?'
            fetchLlmResponse(prompt)
            console.log('done')
        }
    },[startFlag])

    return (
        <CustomerInputLog.Provider value={{



            handleCusInputFile, handleCusRuleFile
        }}>
            {children}
        </CustomerInputLog.Provider>
    )
}

export const useCustomerInputContext = () => useContext(CustomerInputLog)