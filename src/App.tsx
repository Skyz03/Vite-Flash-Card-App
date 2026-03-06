import logo from "../src/assets/images/logo-large.svg"
import './App.css'
import Quiz from "../data.json"
import { useState } from "react";
import { nextQuestion, prevQuestion, resetQuestion, shuffleQuestion, handleKnowThis } from "../utility/script"

// Icons Stats 
import brain from "../src/assets/images/brain.svg"
import book from "../src/assets/images/book.svg"
import layers from "../src/assets/images/layers.svg"
import box from "../src/assets/images/box.svg"

// Icon buttons
import shuffle from "../src/assets/images/icon-shuffle.svg"
import previous from "../src/assets/images/icon-chevron-left.svg"
import next from "../src/assets/images/icon-chevron-right.svg"
import reset from "../src/assets/images/icon-reset.svg"
import check from "../src/assets/images/icon-check.svg"
import category from "../src/assets/images/icon-chevron-down.svg"

interface Flashcard {
  question: string;
  answer: string;
  knownCount: number;
  category: string;
}

interface PrimaryButtonProps {
  iconLeft: string;
  iconRight: string;
  text: string;
  action: () => void;
}

interface StatCardProps {
  label?: string;
  value?: string | number;
  icon: string;
  color: string;
}

const statsIcons = [
  {
    icon: layers,
    label: "Total Cards",
    color: "bg-blue-300",
    value: "24"
  },
  {
    icon: brain,
    color: "bg-green-300",
    label: "Mastered",
    value: "11"
  },
  {
    icon: book,
    color: "bg-red-300",
    label: "In Progress",
    value: "21"
  },
  {
    icon: box,
    color: "bg-pink-300",
    label: "Not Started",
    value: "8"
  },
]


function App() {

  const savedCards = localStorage.getItem("flashcards");
  const [flashcards, setFlashcards] = useState<Flashcard[]>(savedCards ? JSON.parse(savedCards) : Quiz.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = flashcards[currentIndex];
  const shuffleQuestionClick = () =>
    setCurrentIndex(shuffleQuestion(currentIndex));

  const nextQuestionClick = () =>
    setCurrentIndex(nextQuestion(currentIndex, flashcards));

  const prevQuestionClick = () =>
    setCurrentIndex(prevQuestion(currentIndex));

  const resetQuestionClick = () => {
    setCurrentIndex(resetQuestion(currentIndex));

    const resetCards = flashcards.map(card => ({
      ...card,
      knownCount: 0
    }));

    setFlashcards(resetCards);
    localStorage.setItem("flashcards", JSON.stringify(resetCards));
  };

  const handleKnowThisClick = () => {
    const { updatedCards, nextIndex } = handleKnowThis(currentIndex, flashcards);
    setFlashcards(updatedCards);
    setCurrentIndex(nextIndex);
    localStorage.setItem("flashcards", JSON.stringify(updatedCards));
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <div className="flex gap-2">
          <button className="btn-primary">Study Mode</button>
          <button className="btn-secondary">All Cards</button>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Header */}


        {/* Main Study Card */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          {/* Controls */}
          <div className="flex justify-between gap-3 mb-6">
            <div className="flex gap-2">

              <PrimaryButton
                text="All Categories"
                iconLeft=""
                iconRight={category}
                action={handleKnowThisClick}
              />
              <PrimaryButton
                text="Hide Mastered"
                iconLeft=""
                iconRight=""
                action={handleKnowThisClick}
              />
            </div>

            <div className="flex gap-2">
              <PrimaryButton
                text="Shuffle"
                iconLeft={shuffle}
                iconRight=""
                action={shuffleQuestionClick}
              />
            </div>
          </div>
          {/* Flashcard Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center shadow-sm mb-6">
            <p className="text-lg text-gray-700 border rounded-full bg-white shadow-xl text-xs w-[50%] mx-auto p-2">
              {currentCard.category}
            </p>
            <p className="text-lg text-gray-700 p-4">
              {currentCard.question}
            </p>
            <p className="text-black text-xs">Click to reveal answer</p>
            <p className="text-black" >{flashcards[currentIndex].knownCount} / 5</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full gap-2 justify-center items-center">
              <PrimaryButton
                text="I Know This"
                iconLeft={check}
                iconRight=""
                action={handleKnowThisClick}
              />
              <PrimaryButton
                text="Reset Progress"
                iconLeft={reset}
                iconRight=""
                action={resetQuestionClick}
              />
            </div>
          </div>

          <div className="flex w-full justify-between items-center mt-6">

            <PrimaryButton
              text="Previous"
              iconLeft={previous}
              iconRight=""
              action={prevQuestionClick}
            />

            <PrimaryButton
              text="Next"
              iconLeft=""
              iconRight={next}
              action={nextQuestionClick}
            />


          </div>
        </section>


        {/* Study Statistics Card */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-black">
            Study Statistics
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {statsIcons.map((stat, index) => (
              <StatCard
                key={index}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

/* Reusable Stat Card */
function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-gray-50 flex justify-between border border-gray-200 rounded-xl text-center">
      <div className="flex justify-center flex-col items-start p-2">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`flex ${color} items-center p-4 rounded-r-md`}>
        <img src={icon} alt="icon" className="w-6 h-6" />
      </div>
    </div>
  );
}

function PrimaryButton({ iconLeft, text, action, iconRight }: PrimaryButtonProps) {
  return (
    <button
      onClick={action}
      className="flex items-center gap-2 px-4 py-2 bg-white text-black border rounded-full shadow-lg hover:cursor-pointer"
    >
      {iconLeft && <img src={iconLeft} alt="icon" className="w-4 h-4" />}
      {text}
      {iconRight && <img src={iconRight} alt="icon" className="w-4 h-4" />}
    </button>
  );
}

export default App