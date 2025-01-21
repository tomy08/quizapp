export interface Category {
  id: number
  name: string
}

export interface Question {
  response_code: number
  results: Result[]
}

export interface Result {
  type: Type
  difficulty: Difficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum Type {
  Multiple = 'multiple',
  Boolean = 'boolean',
}
