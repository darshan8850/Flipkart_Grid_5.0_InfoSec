import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStateContext } from './ContextProvider';
import { customer_rules } from '../data/CentralData';

const CustomerLog = createContext();

export const CustomerContext = ({ children }) => {

    const{fetchLlmResponse, setShowAnswer, setShowMoreInfo, setShowAlert, setMoreInfo,setShowButtons} = useStateContext()

    const [customerLog, setCustomerLog] = useState({})
    const [showCustomerLog, setShowCustomerLog] = useState(false)
    const[cusAns, setCusAns] = useState()
    
    const[cusMoreInfo, setCusMoreInfo] = useState()
    const[cusShowMoreInfo, setCusShowMoreInto] = useState(false);



    const fetchCustomerLog = () => {
        setShowAnswer(false)
        setShowMoreInfo(false)
        fetch('/customer_random_instance')
            .then((res) => res.json())
            .then((entries) => {
                entries.log_rules = customer_rules
                setCustomerLog(entries)
                setShowCustomerLog(true)
                getCustomerPromptAndRes(entries)
            })
            .catch((e) => {
                console.log("fetch customer log - " + e)
            })
    }

    const getCustomerPromptAndRes = (entries) => {
        setShowAlert(true)
        let prompt = `convo: ${entries.log_transcript} \n 
        rules: ${JSON.stringify(customer_rules)} \n question: Is there any violations 
        in the given conversation for above rules mentioned ?`
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
                setShowAnswer(true)
                setCusAns(analyzedAns.answer)
                setShowButtons(true)
            })
            .catch((e) => {
              console.error("fetch LLM Response - " + e)
            })
    }

    const customerKnowMore = () => {
        setShowAlert(true)
        prompt = customerLog +
            "\n Question: Give me indepth security redemption measures for the violated policies and their probable attacks."

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
                setCusMoreInfo(analyzedAns.ans)
                setCusShowMoreInto(true)
            })
            .catch((e) => {
                console.error("fetch LLM Response - " + e)
            })

    }

    return (
        <CustomerLog.Provider value={{
            customerLog, setCustomerLog, cusMoreInfo, setCusMoreInfo,
            showCustomerLog, setShowCustomerLog, cusAns, 
            fetchCustomerLog, customerKnowMore, cusShowMoreInfo, setCusShowMoreInto
        }}>
            {children}
        </CustomerLog.Provider>
    )
}

export const useCustomerContext = () => useContext(CustomerLog)