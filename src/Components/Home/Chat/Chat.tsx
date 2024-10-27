import { SendProps } from "@Ctypes/types";
import Markdown from "markdown-to-jsx";

function Chat(props: SendProps) {

    const { divRef, uid, message, saveBTN, isPDF } = props
    
    const messageText = message?.parts?.[0]?.text || "No content available";

    return (
        <div ref={divRef} className={`chat ${ isPDF ? 'pdf' : message?.role || 'model'}`}>
            <Markdown>
                {messageText}
            </Markdown>
            <button onClick={() => saveBTN(messageText, uid)} className="plus-btn">+</button>
        </div>
    );
}

export default Chat;