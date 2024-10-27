import { useNavigate } from "react-router-dom";

function SideHeader(props: any) {

    const { handleSlide, clearLocal } = props
    const nav = useNavigate()

    const handleNav = () => {
        nav('/pdf')
    }
    const clear = clearLocal
    return (
        <>
            <div className="flex-column center slide-div">
                <div onClick={handleSlide} className="slide-logo">
                    <img src="./logo.png" alt="logo" />
                </div>
                <section className="btn-wrapper flex-column">
                    <div className="add-btn">
                        <button onClick={handleNav}></button>
                    </div>
                    <div className="add-btn">
                        <button onClick={clear}></button>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SideHeader;