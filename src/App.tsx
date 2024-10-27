import Header from "./Components/Home/Header/Header"
import ChatBot from "./Components/Home/Chat/ChatBot"
import Document from "./Components/PDF/Document"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Message } from "@Ctypes/types"

const getData = localStorage.getItem("chats")
const parse = getData ? JSON.parse(getData) : []


function App() {

  const [chatHistory, setChatHistory] = useState<Message[]>(() => parse)
  const [slide, setSlide] = useState(false)
  const clearTrigger = new Event('localStorageCleared')

  const clearLocal = () => {
    console.log("cleared");
    window.dispatchEvent(clearTrigger)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={
            <>
              <Header slide={slide} setSlide={setSlide} clearLocal={clearLocal} />
              {slide && (<ChatBot chatHistory={chatHistory} setChatHistory={setChatHistory} />)}
            </>
          } />
          <Route path="/pdf" element={<Document />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
