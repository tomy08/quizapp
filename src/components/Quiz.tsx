import { useState, useMemo } from 'react'
import type { Question } from '@/types'

export default function Quiz({ data }: { data: Question }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)

  if (!data || !data.results || data.results.length === 0) {
    return <p className="text-white">No questions available.</p>
  }

  const currentQuestion = data.results[currentQuestionIndex]

  const shuffledAnswers = useMemo(() => {
    return [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5)
  }, [currentQuestionIndex])

  const handleAnswerClick = (answer: string) => {
    console.log(answer)
    if (answer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1)
    }
    setAnsweredQuestions((prev) => prev + 1)

    if (currentQuestionIndex + 1 < data.results.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    } else {
      setShowScore(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowScore(false)
    setAnsweredQuestions(0)
  }

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Quiz Completed!</h1>
        <p className="text-xl text-gray-50">
          You scored {score} out of {data.results.length}
        </p>
        <button
          onClick={restartQuiz}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Restart Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Quiz</h1>
      <div className="p-8 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-50">
          {currentQuestion.question}
        </h2>
        <div className="space-y-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className="w-full px-4 py-2 border-green-400 text-white rounded border-2 hover:border-green-500"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-gray-100">
        Answered {answeredQuestions} of {data.results.length} questions
      </p>
    </div>
  )
}
