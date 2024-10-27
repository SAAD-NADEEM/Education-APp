import Markdown from "markdown-to-jsx";

interface Text {
    text: string
    setIsModel: React.Dispatch<React.SetStateAction<boolean>>
}
function View({ text, setIsModel }: Text) {

    const handleModel = () => {
        setIsModel(false)
    }

    return (
        <section className="view-ctn flex-column">
            <button onClick={handleModel}></button>
            <div className="view_text flex-row">
                <Markdown>{text}</Markdown>       
            </div>
        </section>
    );
}

export default View;