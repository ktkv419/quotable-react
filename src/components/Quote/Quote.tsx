import { IQuote, IQuoteActions } from '../../models'
import './Quote.css'

interface IQuoteProps {
  quoteData: IQuote
  quoteActions: IQuoteActions
}

export function Quote({ quoteData, quoteActions }: IQuoteProps): JSX.Element {
  return (
    <blockquote className="quote" id={quoteData._id}>
      <p className="quote__content">{quoteData.content}</p>
      <div className="quote__info">
        <a
          href="#"
          className="quote__author"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            const target = e.target as HTMLElement
            quoteActions.onAuthorSelect(target.innerHTML)
          }}
        >
          {quoteData.author}
        </a>

        {quoteData.isFavorited ? (
          <button
            className="quote__favorite favorited"
            onClick={() => {
              quoteActions.removeFromFavorites(quoteData._id)
            }}
          >
            <svg className="search__btn__icon">
              <use xlinkHref={`../../../public/icons.svg#icon-star-full`} />
            </svg>
          </button>
        ) : (
          <button
            className="quote__favorite"
            onClick={() => {
              quoteActions.addToFavorites(quoteData._id)
            }}
          >
            <svg className="search__btn__icon">
              <use xlinkHref={`../../../public/icons.svg#icon-star-empty`} />
            </svg>
          </button>
        )}
      </div>
      <div className="quote__tags">
        {quoteData.tags.map((tag) => (
          <button
            className="quote__tag"
            key={tag}
            onClick={(e: React.MouseEvent) => {
              const target = e.target as HTMLElement
              quoteActions.onCategorySelect(target.innerHTML)
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </blockquote>
  )
}
