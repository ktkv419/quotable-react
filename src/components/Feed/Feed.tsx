import { Quote } from '../Quote/Quote'
import { IFeedActions, IQuote, IQuoteActions, IQuotes } from '../../models'
import { IQuery } from '../../App'
import './Feed.css'

interface IFeedProps {
  quoteData: IQuotes
  feedActions: IFeedActions
  quoteActions: IQuoteActions
  favoriteQuotes: string[]
  searchQuery: IQuery[]
}

const Feed = ({
  quoteData,
  feedActions,
  quoteActions,
  favoriteQuotes,
  searchQuery,
}: IFeedProps): JSX.Element => {
  let renderedQuotes
  if (quoteData.quotes) {
    renderedQuotes = quoteData.quotes.results.map((quote: IQuote) => {
      // Mutating is bad...
      quote.isFavorited = favoriteQuotes.includes(quote._id)
      return (
        <Quote quoteData={quote} quoteActions={quoteActions} key={quote._id} />
      )
    })
  } else if (quoteData.error) {
    renderedQuotes = <p>{quoteData.error}</p>
  } else {
    renderedQuotes = <p>Something went wrong</p>
  }

  const renderedTitle = () => {
    if (searchQuery[searchQuery.length - 1]?.type === 'category') {
      if (searchQuery[searchQuery.length - 1]?.query === 'Famous Quotes')
        return `Best of ${searchQuery[searchQuery.length - 1].query}`

      return `Best of ${searchQuery[searchQuery.length - 1].query} quotes`
    } else if (searchQuery[searchQuery.length - 1]?.type === 'search') {
      return `Search results for "${
        searchQuery[searchQuery.length - 1]?.query
      }"`
    } else if (searchQuery[searchQuery.length - 1]?.type === 'author') {
      return `Best quotes of ${searchQuery[searchQuery.length - 1]?.query}`
    } else if (searchQuery[searchQuery.length - 1]?.type === 'favorites') {
      return `Your favorite quotes`
    }
    return 'Quotes'
  }

  return (
    <div className="feed">
      <h2 className="feed__title">{renderedTitle()}</h2>
      {renderedQuotes}
      {quoteData.quotes?.page ? (
        <div className="feed__controls">
          <button
            className="feed__btn feed__btn--prev"
            onClick={feedActions.onPrevPage}
          >
            &larr;
          </button>
          <span className="feed__pages">
            {quoteData.quotes?.page} / {quoteData.quotes?.totalPages}
          </span>
          <button
            className="feed__btn feed__btn--next"
            onClick={feedActions.onNextPage}
          >
            &rarr;
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Feed
