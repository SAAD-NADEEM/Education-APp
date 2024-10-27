import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import View from './View';
import Card from './Card';
import './document.css'
import { Responses } from '@Ctypes/types';


function Document() {

    const [savedRes, setSavedRes] = useState<Responses[]>([])
    const [isModel, setIsModel] = useState<boolean>(false)
    const [modelText, setModelText] = useState<string>('')
    const DBRef = useRef<IDBDatabase | null>(null)


    const handleModel = (text: string) => {
        setModelText(text)
        setIsModel(true)
    }

    const getAllData = () => {
        const db = DBRef.current

        if (db) {
            const transaction = db.transaction('responses', 'readonly')
            const storeObject = transaction.objectStore('responses')
            const getData = storeObject.getAll()

            getData.onsuccess = () => {
                // console.log(typeof getData.result);
                const data = getData.result
                setSavedRes(data)
                console.log(savedRes);
            }
            getData.onerror = () => {
                console.log('Error getting saved data');
            }
        }
    }


    // Get Saved Response Data from indexedDB
    useEffect(() => {
        const openDB = indexedDB.open('saveRes', 1)

        openDB.onsuccess = () => {
            DBRef.current = openDB.result
            getAllData()
        }
        openDB.onerror = () => {
            console.log('Error opening the data!');
        }
    }, [])

    useEffect(() => {
        window.addEventListener('refresh', getAllData)
    },[])

    // Back button callback Function
    const nav = useNavigate()

    const handleBackBTN = () => {
        nav('/')
    }


    return (
        <section className="pdf-section flex-column">
            <header className="document-header flex-column">
                <button onClick={handleBackBTN} className="backToChat"></button>
                <h1 className='fs-heading'>Your Saved Responses</h1>
                <p>These are the responses you’ve saved for future reference. You can revisit them anytime on this page.</p>
            </header>
            <section className="document-wrapper">
                <div className="cards">
                    {savedRes.map((card: Responses) =>
                        <Card key={card.id} handleModel={handleModel} card={card} DBRef={DBRef} />)}
                </div>
            </section>
            {isModel ? <View text={modelText} setIsModel={setIsModel} /> : null}
        </section>
    );
}

export default Document;