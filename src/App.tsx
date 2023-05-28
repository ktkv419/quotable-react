import React, { useEffect, useState } from 'react'
import Feed from './components/Feed/Feed'
import { IQuotes } from './models'
import { fetchQuotes } from './services/fetchQuotes'
import Loading from './components/Loading/Loading'
import Error from './components/Error/Error'
import Search from './components/Search/Search'
import Presets from './components/Presets/Presets'
import './App.css'

export interface IQuery {
  query: string | string[]
  type: string
  page?: number
}

function App() {
  const [quoteData, setQuoteData] = useState<IQuotes | null>(null)

  const [searchQuery, setSearchQuery] = useState<IQuery[]>([])

  const [loading, setLoading] = useState(true)

  if (window.localStorage.getItem('favoriteQuotes') === null)
    window.localStorage.setItem('favoriteQuotes', '[]')

  const [favoriteQuotes, setFavoriteQuotes] = useState<Array<string>>(
    JSON.parse(window.localStorage.getItem('favoriteQuotes')!)
  )

  const quoteActions = {
    onCategorySelect: (category: string) => {
      setSearchQuery([
        ...searchQuery,
        {
          query: category,
          type: 'category',
          page: 1,
        },
      ])
    },

    onAuthorSelect: (author: string) => {
      setSearchQuery([
        ...searchQuery,
        {
          query: author,
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

  return (
    <div className="container">
      <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <Presets
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        favoriteQuotes={favoriteQuotes}
      />
      {loading ? (
        <Loading />
      ) : quoteData ? (
        <Feed
          quoteData={quoteData}
          feedActions={feedActions}
          quoteActions={quoteActions}
          favoriteQuotes={favoriteQuotes}
          searchQuery={searchQuery}
        />
      ) : (
        <Error message={'Something went horribly wrong...'} />
      )}
    </div>
  )
}

export default App
