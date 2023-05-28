import { IQuote, IQuotes } from '../models'

export async function fetchQuotes(category: {
  query: string
  type: string
  page: number
}): Promise<IQuotes> {
  try {
    let response
    if (category.query.toLowerCase() !== 'random') {
      response = await fetch(
        `https://api.quotable.io/quotes?` +
          new URLSearchParams({
            limit: '20',
            tags: category.query,
            page: `${category.page}`,
          })
      )
      return { feedData: { quotes: await response.json(), error: null } }
    } else {
      response = await fetch(
        `https://api.quotable.io/quotes/random?` +
          new URLSearchParams({
            limit: '20',
          })
      )
      return {
        feedData: {
          quotes: { results: (await response.json()) as IQuote[] },
          error: null,
        },
      }
    }
  } catch (error) {
    console.error(error)
    return { feedData: { error: error } }
  }
}
