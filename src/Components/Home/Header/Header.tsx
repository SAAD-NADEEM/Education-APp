import "./header.css"
import SideHeader from "./SideHeader"
function Header(props: any) {

    const { slide, setSlide, clearLocal } = props

    const handleSlide = () => {
        setSlide(!slide)
    }

    return (
        <header className={`grid-layout main-header ${slide && "slide"}`}>
            {!slide ? (
                <>
                    <ul className={`navbar-desktop flex-row center`}>
                        <li className="logo-li flex-row">
                            <img src="./logo.png" alt="logo" />
                            <p>AI Tutor</p>
                        </li>
                    </ul>
                    <section className={`sec-1`}>
                        <div className="sec-1-ctn">
                            <h1>🎓 Unlock Knowledge with Your Personal Quiz Tutor</h1>
                            <p>Transform your study materials into engaging quizzes with ease. Our interactive cartoon tutor guides you through each topic, making learning both fun and effective. Upload your PDFs or text files, and let the magic of personalized quizzes begin!</p>
                            <button onClick={handleSlide} >Get Quizzed</button>
                            <button>About</button>
                        </div>
                    </section>
                    <section className={`sec-2`}>
                        <div className="sec-2-ctn flex-row">
                            <img src="./hero-logo.png" alt="hero-image" />
                        </div>
                    </section>
                </>
            ) : <SideHeader handleSlide={handleSlide} clearLocal={clearLocal}/>
            }
        </header>
    );
}

export default Header;