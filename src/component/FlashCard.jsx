import { useState, useEffect, useRef } from "react"

export default function FlashCard({ flashcard, flip, onFlip }) {
    const [height, setHeight] = useState("initial")

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }
    useEffect(setMaxHeight, [
        flashcard.question, 
        flashcard.answer, 
        flashcard.options, 
        flashcard.difficulty, 
        flashcard.category, 
        flashcard.type])
        
    useEffect(()=> {
        window.addEventListener("resize", setMaxHeight)
        return () => window.removeEventListener("resize", setMaxHeight)
    }, [])
    return (
        <div 
            className={`card ${flip ? "flip": ""}`}
            style={{height: height}}
            onClick={onFlip}
        >
            <div className="front" ref={frontEl}>
                <h2>{flashcard.category}</h2>
                {flashcard.question} <span className="difficulty">{flashcard.difficulty}</span> <span className="type">{flashcard.type}</span>
                <div className="flashcard-options">
                    {flashcard.options.map((option, index) => {
                        return <div className="flashcard-option" key={option}>
                            {option}
                        </div>
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>{flashcard.answer}</div>
        </div>
    )
}