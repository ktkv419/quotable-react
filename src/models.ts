export interface IQuote {
  _id: string
  content: string
  author: string
  authorSlug: string
  tags: string[]
  isFavorited: boolean
}

export interface IQuotes {
  error: Error | any
  quotes?:
    | {
        count?: number
        results: IQuote[]
        page?: number
        totalCount?: number
        totalPages?: number
      }
    | undefined
}

export interface IFeedActions {
  onNextPage: React.MouseEventHandler<HTMLButtonElement>
  onPrevPage: React.MouseEventHandler<HTMLButtonElement>
}

export interface IQuoteActions {
  onCategorySelect: (e: React.MouseEventHandler<HTMLButtonElement>) => void
  onAuthorSelect: (e: React.MouseEventHandler<HTMLButtonElement>) => void
  addToFavorites: (id: string) => void
  removeFromFavorites: (id: string) => void
}

export enum SearchType {
  AUTHOR = 'author',
  QUOTE = 'quote',
  CATEGORY = 'category',
  RANDOM = 'random',
}
