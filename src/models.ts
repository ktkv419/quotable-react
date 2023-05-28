export interface IQuote {
  _id: string
  content: string
  author: string
  authorSlug: string
  tags: string[]
}

export interface IQuotes {
  feedData: {
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
}

export interface Actions {
  actions?: {
    onCategorySelect: (e: React.MouseEventHandler<HTMLButtonElement>) => void
    onNextPage: React.MouseEventHandler<HTMLButtonElement>
    onPrevPage: React.MouseEventHandler<HTMLButtonElement>
  }
}

export interface IQuoteActions {
  onCategorySelect: (e: React.MouseEventHandler<HTMLButtonElement>) => void
}

export enum SearchType {
  AUTHOR = 'author',
  QUOTE = 'quote',
  CATEGORY = 'category',
  RANDOM = 'random',
}
