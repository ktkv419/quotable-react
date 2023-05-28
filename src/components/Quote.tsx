import { IQuote, IQuoteActions } from '../models'

interface IQuoteProps {
  quoteData: IQuote
  quoteActions: IQuoteActions
}

export function Quote({ quoteData, quoteActions }: IQuoteProps): JSX.Element {
  return (
    <div className="quote" id={quoteData._id}>
      <p className="quote__author">{quoteData.content}</p>
      <h4 className="quote__text">{quoteData.author}</h4>
      <a
        href="#"
        className="quote__author"
        onClick={(e) => {
          e.preventDefault()
          quoteActions.onAuthorSelect(e)
        }}
      >
        {quoteData.author}
      </a>
      {quoteData.tags.map((tag) => (
        <button
          onClick={(e) => {
            quoteActions.onCategorySelect(e)
          }}
        >
          {tag}
        </button>
        // <a href={`#${tag}`}>{tag}</a>
      ))}
      {quoteData.isFavorited ? (
        <button
          onClick={() => {
            quoteActions.removeFromFavorites(quoteData._id)
          }}
        >
          Dislike
        </button>
      ) : (
        <button
          onClick={() => {
            quoteActions.addToFavorites(quoteData._id)
          }}
        >
          Like
        </button>
      )}
    </div>
  )
}
