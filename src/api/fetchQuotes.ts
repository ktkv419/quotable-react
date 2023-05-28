import { IQuotes } from '../models'

export async function fetchQuotes(category: {
  query: string | string[]
  type: string
  page?: number
}): Promise<IQuotes> {
  try {
    let response, data
    if (category.type === 'category') {
      if (category.query == 'random') {
        response = await fetch(
          `https://api.quotable.io/quotes/random?` +
            new URLSearchParams({
              limit: '20',
            })
        )
        data = {
          quotes: { results: await response.json() },
          error: null,
        }
      } else {
        response = await fetch(
          `https://api.quotable.io/quotes?` +
            new URLSearchParams({
              limit: '20',
              tags: category.query as string,
              page: `${category.page}`,
            })
        )
        data = { quotes: await response.json(), error: null }
      }
    } else if (category.type === 'author') {
      response = await fetch(
        `https://api.quotable.io/quotes?` +
          new URLSearchParams({
            author: category.query as string,
            page: `${category.page}`,
          })
      )
      data = {
        quotes: await response.json(),
        error: null,
      }
      // console.log(data)
    } else if (category.type === 'search') {
      response = await fetch(
        `https://api.quotable.io/search/quotes?` +
          new URLSearchParams({
            query: category.query as string,
            page: `${category.page}`,
          })
      )
      data = {
        quotes: await response.json(),
        error: null,
      }
    } else if (category.type === 'favorites') {
      if (category.query instanceof Array) {
        const fetchedQuotes = await Promise.all(
          category.query.map((id) =>
            fetch(`https://api.quotable.io/quotes/${id}`)
          )
        )

        const fetchedJson = await Promise.all(
          fetchedQuotes.map((promise) =>
            promise
              .json()
              .then((responseJson) => responseJson)
              .catch((error) => {
                console.error('Error:', error)
                return null // or any other error handling
              })
          )
        )

        data = { quotes: { results: fetchedJson }, error: null }
      }
    }
    if (data) {
      // console.log(data)
      return data
    } else {
      throw new Error('Something went wrong')
    }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}
