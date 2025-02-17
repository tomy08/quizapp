import type { AnsweredQuestion, Result } from '@/types'

type Props = {
  currentQuestion: Result
  shuffledAnswers: string[]
  answeredQuestions: AnsweredQuestion[]
  handleAnswerClick: (answer: string) => void
}

export default function QuizQuestion(props: Props) {
  const {
    currentQuestion,
    shuffledAnswers,
    answeredQuestions,
    handleAnswerClick,
  } = props
  return (
    <div className="flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      <div className="p-8 rounded-lg w-96  shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {currentQuestion.question}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className="w-full px-4 py-2 border-2 border-green-500 text-white rounded hover:bg-green-500 hover:animate-shake transition-all"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4">
        Answered {answeredQuestions.length} of 10 questions
      </p>
    </div>
  )
}
