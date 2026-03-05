interface Flashcard {
    question: string;
    answer: string;
    knownCount: number;
    category: string;
}

export const nextQuestion = (currentIndex: number, flashcards: Flashcard[]) => (currentIndex < flashcards.length - 1 ? currentIndex + 1 : 0);

export const prevQuestion = (currentIndex: number) => (currentIndex > 0 ? currentIndex - 1 : 0);

export const resetQuestion = (currentIndex: number) => currentIndex > 0 ? (0) : 0;

export const shuffleQuestion = (currentIndex: number) => (currentIndex >= 0 ? Math.round((Math.random() * 5)) + 1 : 0)

export const handleKnowThis = (currentIndex: number, flashcards: Flashcard[]) => {
    const updatedCards = flashcards.map((card: Flashcard, index: number) => index === currentIndex ? { ...card, knownCount: card.knownCount + 1 } : card);
    const nextIndex = currentIndex < flashcards.length - 1 ? currentIndex + 1 : 0;
    return { updatedCards, nextIndex };
};