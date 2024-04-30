import { useState } from "react";
import FlashCard from "./FlashCard"

export default function FlashCardList({ flashCards }) {
    const [flipId, setFlipId] = useState(null);
    return (
        <div className="card-grid">
            {flashCards.map(flashcard => (
               <FlashCard 
                    flashcard = {flashcard} 
                    key = {flashcard.id} 
                    flip={flashcard.id === flipId}
                    onFlip={() => setFlipId(flashcard.id === flipId ? null : flashcard.id)}
                />
            ))}
        </div>
    )
}
