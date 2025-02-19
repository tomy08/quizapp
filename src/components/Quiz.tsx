import { useState, useEffect } from 'react'
import type { Question, AnsweredQuestion } from '@/types'

import QuizQuestion from './QuizQuestion'
import QuizScore from './QuizScore'

export default function Quiz({ data }: { data: Question }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Array<AnsweredQuestion>
  >([])
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])

  const currentQuestion = data.results[currentQuestionIndex]

  useEffect(() => {
    if (currentQuestion) {
      setShuffledAnswers(
        [
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ].sort(() => Math.random() - 0.5)
      )
    }
  }, [currentQuestionIndex, data])

  const handleAnswerClick = (answer: string) => {
    const isCorrect = answer === currentQuestion.correct_answer
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }

    setAnsweredQuestions((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
      },
    ])

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
    setAnsweredQuestions([])
    setShuffledAnswers([])
  }

  if (showScore) {
    return (
      <QuizScore
        score={score}
        answeredQuestions={answeredQuestions}
        restartQuiz={restartQuiz}
      />
    )
  }

  return (
    <QuizQuestion
      currentQuestion={currentQuestion}
      shuffledAnswers={shuffledAnswers}
      answeredQuestions={answeredQuestions}
      handleAnswerClick={handleAnswerClick}
    />
  )
}
