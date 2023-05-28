import { Quote } from './Quote'
import { IFeedActions, IQuote, IQuoteActions, IQuotes } from '../models'

interface IFeedProps {
  quoteList: IQuotes
  feedActions: IFeedActions
  quoteActions: IQuoteActions
  favoriteQuotes: string[]
}

const Feed = (props: IFeedProps): JSX.Element => {
  let renderedQuotes
  if (props.quoteList.quotes) {
    renderedQuotes = props.quoteList.quotes.results.map((quote: IQuote) => {
      // Mutating is bad...
      quote.isFavorited = props.favoriteQuotes.includes(quote._id)
      return <Quote quoteData={quote} quoteActions={props.quoteActions} />
    })
  } else if (props.quoteList.error) {
    renderedQuotes = <p>{props.quoteList.error}</p>
  } else {
    renderedQuotes = <p>Something went wrong</p>
  }

  return (
    <div className="feed">
      <h2 className="feed__title">Quotes</h2>
      {renderedQuotes}
      {props.quoteList.quotes?.page ? (
        <div className="feed__controls">
          <button className="feed__prev" onClick={props.feedActions.onPrevPage}>
            Previous
          </button>
          <button className="feed__next" onClick={props.feedActions.onNextPage}>
            Next
          </button>
          {props.quoteList.quotes?.page} / {props.quoteList.quotes?.totalPages}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Feed
