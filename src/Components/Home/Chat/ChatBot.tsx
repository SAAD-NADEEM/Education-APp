import { v4 as uuidv4 } from 'uuid';
import { useRef, useEffect, useState } from 'react';
import { sendMessage } from '@CModules/sendMessage';
import { Message, Input, SendProps } from '@Ctypes/types';
import "./chatbot.css"
import Chat from './Chat';
import InputBox from './InputBox';
import { sendHistory } from '@CModules/history';




// Set the workerSrc

function ChatBot(props: any) {

    const { chatHistory, setChatHistory } = props

    // All neccessary variables(State, Ref, etc)
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY //API KEY
    const hasRun = useRef<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const DBRef = useRef<IDBDatabase | null>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)



    const intro = () => {
        const modelMessage: Message = {
            message: {
                role: 'model',
                parts: [{
                    text: "Hello! 👋 I'm AI Tutor. To help you learn, I need some material to work with. Could you please provide me with either a text input or a PDF file? 📚 Once I have that, I'll be happy to answer any questions you have about it."
                }]
            },
            id: uuidv4()
        }
        setChatHistory((prev: any) => [...prev, modelMessage])
    }

    useEffect(() => {
        if (hasRun.current) return

        if (chatHistory.length === 0) {
            intro()
        }
        hasRun.current = true

    }, [])


    // --------------- Saving Chats -------------------
    const saveData = () => {
        localStorage.setItem('chats', JSON.stringify(chatHistory))
    }

    

    const send = async (e: any) => {

        e.preventDefault()

        if (!inputRef.current?.value) return

        setIsLoading(true)

        const userMessage: Input = {
            message: {
                role: 'user',
                parts: [{
                    text: inputRef.current.value as string,
                }],
            },
            id: uuidv4()
        };
        setChatHistory((prev: any) => [...prev, userMessage])

        inputRef.current.value = ''

        // Parameters for the sendMessage Module
        const params = {
            apiKey,
            message: userMessage.message.parts[0].text,
            history: sendHistory(chatHistory)
        }

        // sendMessage module(For text based input)
        await sendMessage(params)
            .then((res) => {
                console.log(".then started");
                const modelMessage: Message = {
                    message: {
                        role: 'model',
                        parts: [{
                            text: res
                        }],
                    },
                    id: uuidv4()
                }
                setChatHistory((prev: any) => [...prev, modelMessage])
            })
        setIsLoading(false)
    }

    //------------------ Function for the CLear button ----------------
    const handleClear = () => {
        localStorage.clear()
        setChatHistory([])
        intro()
    }

    useEffect(() => {
        window.addEventListener('localStorageCleared', handleClear)

        return () => {
            window.removeEventListener('localStorageCleared', handleClear)
        }
    }, [])


    //------------------ Saving Chats to localStorage ------------------
    useEffect(() => {
        saveData()
        console.log("saveData started");
    }, [chatHistory])


    useEffect(() => {
        console.log("re-renders");

        return () => {
            console.log('unmiunted');
        }
    })



    // ------------------ IndexedDB -------------------------
    // Creating Table for saved Responses in indexedDB
    useEffect(() => {
        const openDB = indexedDB.open('saveRes', 1)
        openDB.onupgradeneeded = () => {
            const db = openDB.result
            if (!db.objectStoreNames.contains('responses')) {
                const Create = db.createObjectStore('responses', { keyPath: 'id' })
                Create.createIndex('response', 'response', { unique: false })
            }
        }

        openDB.onsuccess = () => {
            DBRef.current = openDB.result
        }

        openDB.onerror = () => {
            console.log("Data Base Failed to Open");
        }
    }, [])

    // Save Button onClick Callback Function
    const saveBTN = (text: string, id: string) => {

        const db = DBRef.current
        if (db) {
            const transaction = db.transaction('responses', 'readwrite')
            const storeObject = transaction.objectStore('responses')

            const req = storeObject.add({
                id: id,
                response: text
            })

            req.onsuccess = () => {
                console.log("Response successfully added");
            }
            req.onerror = () => {
                console.log("SaveBTN, objectStore error" + req.error);
            }
        } else {
            console.log("no data base initilized!");
        }

    }


    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chatHistory])

    return (
        <section className="chatbot flex-column" id="CHAT">
            <header className="fs-heading">AI Tutor</header>
            <section className="messages flex-column">
                {chatHistory.map((message: Message) => {
                    const sendProps: SendProps = {
                        divRef: divRef,
                        uid: message.id,
                        message: message.message,
                        saveBTN: saveBTN,
                        isPDF: message.isPdf
                    }

                    if(message.isPdf) return

                    return <Chat key={message.id} {...sendProps} />
                }
                )}
            </section>
            <form onSubmit={send} className="inputArea flex-row center">
               <InputBox isLoading={isLoading} inputRef={inputRef} />
            </form>
        </section >
    );
}

export default ChatBot;

