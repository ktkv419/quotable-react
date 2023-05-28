import React, { useState } from 'react'
import { IQuery } from '../../App'
import './Search.css'

interface ISearchProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<IQuery[]>>
  searchQuery: IQuery[]
}

const Search = ({ setSearchQuery, searchQuery }: ISearchProps) => {
  const [inputSearch, setInputSearch] = useState('')

  const submitSearchHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery([
      ...searchQuery,
      {
        query: inputSearch,
        type: 'search',
        page: 1,
      },
    ])
    setInputSearch('')
  }

  return (
    <form className="search" onSubmit={submitSearchHandler}>
      <input
        type="text"
        className="search__input"
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
        placeholder="Friendship..."
      />
      <button className="search__btn" formAction="submit">
        <svg className="search__btn__icon">
          <use xlinkHref={`../../../public/icons.svg#icon-search`} />
        </svg>
      </button>
    </form>
  )
}

export default Search
