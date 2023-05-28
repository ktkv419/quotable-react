import React, { FormHTMLAttributes, useEffect, useState } from 'react'
import Feed from './components/Feed'
import { IQuotes } from './models'
import { fetchQuotes as fetchQuotes } from './api/fetchQuotes'
import Loading from './components/Loading'

interface IQuery {
  query: string
  type: string
  page: number
}

function App() {
  const [quotes, setQuotes] = useState<IQuotes | null>(null)
  const [inputSearch, setInputSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState<IQuery[]>([])
  const [curPage, setCurPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState<IQuery>({
    query: 'random',
    type: 'category',
    page: curPage,
  })
  const [loading, setLoading] = useState(false)
  // const [searchQuery, setSearchQuery] = useState([])

  const actions = {
    onCategorySelect: (e: React.ChangeEvent<HTMLButtonElement>) => {
      setSearchTerm({
        query: e.target.innerHTML,
        type: 'category',
        page: curPage,
      })
    },
    onNextPage: () => {
      if (
        quotes?.feedData.quotes?.totalPages &&
        quotes.feedData.quotes.totalPages >= curPage + 1
      ) {
        setCurPage((curPage) => (curPage += 1))
      }
    },
    onPrevPage: () => {
      if (curPage - 1 > 0) setCurPage((curPage) => (curPage -= 1))
    },
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true)
      const fetchData = async () => {
        setSearchQuery((searchQuery) => [...searchQuery, searchTerm])
        setQuotes(await fetchQuotes(searchTerm))
        setLoading(false)
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      setLoading(true)
      const fetchData = async () => {
        setSearchQuery((searchQuery) => [...searchQuery, searchTerm])
        setQuotes(await fetchQuotes(searchTerm))
        setCurPage(1)
        setLoading(false)
      }
      fetchData()
    }
  }, [searchQuery])

  // useEffect(() => {
  //   if (!loading) {
  //     setLoading(true)
  //     const fetchData = async () => {
  //       console.log(searchQuery[searchQuery.length - 1])
  //       setQuotes(await fetchQuotes(searchQuery[searchQuery.length - 1]))
  //       setLoading(false)
  //     }
  //     fetchData()
  //   }
  // }, [curPage])

  const submitSearchHandler = (e) => {
    e.preventDefault()
    setSearchTerm(inputSearch)
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
            setSearchTerm({ query: 'random', type: 'category' })
          }}
        >
          Random
        </button>
      </div>
      {quotes === null ? <Loading /> : <Feed {...quotes} actions={actions} />}
    </>
  )
}

export default App
