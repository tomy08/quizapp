import { useState, useEffect } from 'react'
import type { Question } from '@/types'

export default function Quiz({ data }: { data: Question }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState([] as string[])

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => [...prev, answer])
    if (answer === data.results[currentQuestion].correct_answer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < data.results.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleFinish()
    }
  }

  const handleFinish = () => {
    setShowScore(true)
  }

  if (showScore) {
    return (
      <div>
        <h1>Your score is {score}</h1>
        <button
          onClick={() => window.location.reload()}
          className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 border border-green-600 group-active:border-green-500"></span>
          <span className="block border border-green-600 bg-green-600 px-12 py-3 transition-transform active:border-green-500 active:bg-green-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
            Play Again
          </span>
        </button>
        // boton para volver al menu principal
        <button
          onClick={() => {
            window.location.href = '/'
          }}
          className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        >
          Go back to main menu
        </button>
      </div>
    )
  }

  const answers = [
    ...data.results[currentQuestion].incorrect_answers,
    data.results[currentQuestion].correct_answer,
  ]

  const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-8 mb-8 text-gray-50">
        TriviaWise
      </h1>
      <h2 className="font-extrabold text-gray-50 sm:block text-xl text-center ">
        {data.results[currentQuestion].question}
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={answer}
            className="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500"
            onClick={() => handleAnswer(answer)}
          >
            <span className="absolute inset-0 border border-current"></span>
            <span className="block border border-current bg-gray-950 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              {answer}
            </span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 mt-8">
        <button
          onClick={handleNextQuestion}
          className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 border border-green-600 group-active:border-green-500"></span>
          <span className="block border border-green-600 bg-green-600 px-12 py-3 transition-transform active:border-green-500 active:bg-green-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
            {currentQuestion === data.results.length - 1 ? 'Finish' : 'Next'}
          </span>
        </button>
      </div>
    </div>
  )
}
