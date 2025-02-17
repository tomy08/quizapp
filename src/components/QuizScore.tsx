import type { AnsweredQuestion } from '@/types'

type Props = {
  score: number
  answeredQuestions: AnsweredQuestion[]
  restartQuiz: () => void
}

export default function QuizScore(props: Props) {
  const { score, answeredQuestions, restartQuiz } = props
  return (
    <div className="flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-xl mb-4">You scored {score} out of 10</p>

      <div className="w-full max-w-2xl  p-4 rounded-lg overflow-y-auto max-h-[350px]">
        {answeredQuestions.map((q, index) => (
          <div key={index} className="p-3 border-b border-gray-700">
            <p className="font-semibold">{q.question}</p>
            <p
              className={`mt-1 ${
                q.isCorrect ? 'text-green-400' : 'text-red-400'
              }`}
            >
              Your Answer: {q.selectedAnswer}
            </p>
            <p className="text-green-300">Correct Answer: {q.correctAnswer}</p>
          </div>
        ))}
      </div>

      <button
        onClick={restartQuiz}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Restart Quiz
      </button>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Menu
      </a>
    </div>
  )
}
