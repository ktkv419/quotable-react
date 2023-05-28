import React, { useRef } from 'react'
import { IQuote, IQuoteActions } from '../models'

interface QuoteProps {
  quote: IQuote
}

export function Quote(props: QuoteProps & IQuoteActions): JSX.Element {
  const quoteRef = useRef<HTMLDivElement>()

  function addToFavorite(e: React.MutableRefObject<HTMLDivElement> | null) {
    if (e?.current) {
      const { id } = e.current
      let favoriteQuotesStorage = localStorage.getItem('favoriteQuotes')
      if (!favoriteQuotesStorage) {
        localStorage.setItem('favoriteQuotes', '[]')
        favoriteQuotesStorage = '[]'
      }
      const favoriteQuotes = JSON.parse(favoriteQuotesStorage) as string[]
      favoriteQuotes.push(id)
      localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes))
    }
  }

  return (
    <div className="quote" ref={quoteRef} id={props.quote._id}>
      <p className="quote__author">{props.quote.content}</p>
      <h4 className="quote__text">{props.quote.author}</h4>
      {props.quote.tags.map((tag) => (
        <button
          onClick={(e) => {
            props.onCategorySelect(e)
          }}
        >
          {tag}
        </button>
        // <a href={`#${tag}`}>{tag}</a>
      ))}
      <button
        onClick={() => {
          addToFavorite(quoteRef)
        }}
      >
        Like
      </button>
    </div>
  )
}
