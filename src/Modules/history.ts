import { Message } from "@Ctypes/types"
import { Content } from "@google/generative-ai"

export const sendHistory = (chatHistory:Message[]) => {
    const temp: Content[] = chatHistory.map((chat: Message) => chat.message)

    return temp
}