import { Content } from "@google/generative-ai"

export interface Message {
    message: Content,
    id: string,
    isPdf?: boolean
}
interface text {
    role: 'user' | 'model' | 'pdf';
    parts: {
        text: string
    }[];
}

export interface Input {
    message: text
    id: string
}

export interface SendProps {
    divRef: React.RefObject<HTMLDivElement>,
    uid: string,
    message: Content,
    saveBTN: (text: string, id: string) => void,
    isPDF?: boolean
}
export type { Content }


export interface Responses {
    id: string,
    response: string
}
