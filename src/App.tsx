import React, { useEffect, useState } from 'react'
import Feed from './components/Feed'
import { IQuotes } from './models'
import { fetchQuotes as fetchQuotes } from './api/fetchQuotes'
import Loading from './components/Loading'

interface IQuery {
  query: string | string[]
  type: string
  page?: number
}

function App() {
  const [quoteData, setQuoteData] = useState<IQuotes | null>(null)
  const [inputSearch, setInputSearch] = useState('')

  const [searchQuery, setSearchQuery] = useState<IQuery[]>([])

  const [loading, setLoading] = useState(true)

  if (window.localStorage.getItem('favoriteQuotes') === null)
    window.localStorage.setItem('favoriteQuotes', '[]')

  const [favoriteQuotes, setFavoriteQuotes] = useState<Array<string>>(
    JSON.parse(window.localStorage.getItem('favoriteQuotes')!)
  )

  const quoteActions = {
    onCategorySelect: (e: React.ChangeEvent<HTMLButtonElement>) => {
      setSearchQuery([
        ...searchQuery,
        {
          query: e.target.innerHTML,
          type: 'category',
          page: 1,
        },
      ])
    },

    onAuthorSelect: (e) => {
      setSearchQuery([
        ...searchQuery,
        {
          query: e.target.innerHTML,
          type: 'author',
          page: 1,
        },
      ])
    },

    addToFavorites: (id: string) => {
      setFavoriteQuotes([...favoriteQuotes, id])
    },

    removeFromFavorites: (id: string) => {
      setFavoriteQuotes(favoriteQuotes.filter((quoteID) => id !== quoteID))
    },
  }

  const feedActions = {
    onNextPage: () => {
      if (
        quoteData?.quotes?.totalPages &&
        quoteData.quotes.totalPages >=
          searchQuery[searchQuery.length - 1].page! + 1
      ) {
        setSearchQuery([
          ...searchQuery,
          {
            query: searchQuery[searchQuery.length - 1].query,
            type: searchQuery[searchQuery.length - 1].type,
            page: searchQuery[searchQuery.length - 1].page! + 1,
          },
        ])
      }
    },
    onPrevPage: () => {
      if (
        quoteData?.quotes?.totalPages &&
        searchQuery[searchQuery.length - 1].page! - 1 > 0
      )
        setSearchQuery([
          ...searchQuery,
          {
            query: searchQuery[searchQuery.length - 1].query,
            type: searchQuery[searchQuery.length - 1].type,
            page: searchQuery[searchQuery.length - 1].page! - 1,
          },
        ])
    },
  }

  useEffect(() => {
    window.localStorage.setItem(
      'favoriteQuotes',
      JSON.stringify(favoriteQuotes)
    )
  }, [favoriteQuotes])

  useEffect(() => {
    const fetchInitialQuotes = async () => {
      setQuoteData(await fetchQuotes({ query: 'random', type: 'category' }))
      setLoading(false)
    }
    fetchInitialQuotes()
  }, [])

  useEffect(() => {
    // console.log(searchQuery)
    if (!loading) {
      setLoading(true)
      console.log('fetched')
      const fetchData = async () => {
        setQuoteData(await fetchQuotes(searchQuery[searchQuery.length - 1]))
        setLoading(false)
      }
      fetchData()
    }
  }, [searchQuery])

  const submitSearchHandler = (e) => {
    e.preventDefault()
    setSearchQuery([
      ...searchQuery,
      {
        query: inputSearch,
        type: 'search',
        page: 1,
      },
    ])
  }

  return (
    <>
      <form className="search" onSubmit={submitSearchHandler}>
        <input
          type="text"
          className="quote__input"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <button formAction="submit">Search</button>
      </form>
      <div className="presets">
        <button
          className="preset__item"
          onClick={() => {
            setSearchQuery([
              ...searchQuery,
              { query: 'random', type: 'category' },
            ])
          }}
        >
          Random
        </button>
        <button
          className="preset__item"
          onClick={() => {
            setSearchQuery([
              ...searchQuery,
              { query: favoriteQuotes, type: 'favorites' },
            ])
          }}
        >
          Favorites
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Feed
          quoteList={quoteData}
          feedActions={feedActions}
          quoteActions={quoteActions}
          favoriteQuotes={favoriteQuotes}
        />
      )}
    </>
  )
}

export default App
