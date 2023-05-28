import { Quote } from './Quote'
import { Actions, IQuote, IQuotes } from '../models'
import Loading from './Loading'
import { useEffect, useState } from 'react'

const Feed = ({ feedData, actions }: IQuotes & Actions): JSX.Element => {
  let renderedQuotes

  if (feedData.quotes) {
    renderedQuotes = feedData.quotes.results.map((quote: IQuote) => {
      return (
        <Quote quote={quote} onCategorySelect={actions?.onCategorySelect} />
      )
    })
  } else if (feedData.error) {
    renderedQuotes = <p>{feedData.error}</p>
  } else {
    renderedQuotes = <p>Something went wrong</p>
  }

  return (
    <>
      <div className="feed">
        <h2 className="feed__title">Quotes</h2>
        {renderedQuotes}
        {feedData.quotes?.page ? (
          <div className="feed__controls">
            <button className="feed__prev" onClick={actions?.onPrevPage}>
              Previous
            </button>
            <button className="feed__next" onClick={actions?.onNextPage}>
              Next
            </button>
            {feedData.quotes?.page} / {feedData.quotes?.totalPages}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Feed
