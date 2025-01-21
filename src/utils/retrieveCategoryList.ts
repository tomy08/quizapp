import type { Category } from '../types'

export const retrieveCategoryList = async (): Promise<Category[]> => {
  return await fetch('https://opentdb.com/api_category.php')
    .then((response) => response.json())
    .then((data) => data.trivia_categories)
}
