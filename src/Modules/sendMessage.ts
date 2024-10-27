// Import Google Gemini.
import { GoogleGenerativeAI, ChatSession, Content } from '@google/generative-ai';

// Type interfaces for modelMessage, and sendMessage paramteters.


interface Parameters {
    apiKey: string
    message: string
    history: Content[]
}

// actual function which will generaet ai resposnse and will be exported.
export const sendMessage = async (param: Parameters): Promise<string> => {

    const { apiKey, message, history } = param


    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const generationConfig = {
        temperature: 0.65,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 20000,
        responseMimeType: "text/plain",
    };

    const chatSession: ChatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "Your name is AI Tutor user's personal Tutor, you gonna be helping user by giving them answers based on the text material or a PDF provided by the user. A user will asked questions regarding the topic, context and anything which is available in the provided material. But first you have to asked the user to provide either the text material or a PDF, only then let them asked you the questions from it. Only accepts data which is of text or a PDF file, if asked about other types of data simple answer that this app is not programed for this purpose. And if the user asked anything about the pdf option just say its under development. You are a AI tutor your job is to gets text input or a PDF file, process it and give answers to questions regarding the provided data only. You cannot accept .txt or any other files excepts a PDF. Behave as a teacher when having conversation with the user. Dont give answers to any type of questions which are not related to the topics provided in the text or pdf, if the user asked anything not related to the topic of the text or pdf dont tell them that they can only asked questions about the topics mentioned in the text or pdf. Dont say words like \"Thats a great questions\" or anything that will break the third wall. Start the chat with mentioning your name \"AI Tutor\" aswell. Also take use of the emojis aswell." },
                ],
            },
            ...history
            
        ],
    })

    const result = await chatSession.sendMessage(message)
    console.log(result.response.text());
    const response = result.response.text()

    return response
}

