import React from 'react'
import { IQuery } from '../../App'
import './Presets.css'

const categories = [
  'Famous Quotes',
  'Wisdom',
  'Friendship',
  'Motivational',
  'Business',
  'Success',
  'Inspirational',
]

interface IPresetsProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<IQuery[]>>
  searchQuery: IQuery[]
  favoriteQuotes: string[]
}

const Presets = ({
  searchQuery,
  setSearchQuery,
  favoriteQuotes,
}: IPresetsProps) => {
  const renderedCategoryButtons = categories.map((category) => {
    return (
      <button
        className="presets__category"
        onClick={() => {
          setSearchQuery([
            ...searchQuery,
            { query: category, type: 'category' },
          ])
        }}
      >
        {category}
      </button>
    )
  })

  return (
    <div className="presets">
      <button
        className="presets__item"
        onClick={() => {
          setSearchQuery([
            ...searchQuery,
            { query: 'random', type: 'category' },
          ])
        }}
      >
        Random quote
      </button>
      <button
        className="presets__item"
        onClick={() => {
          setSearchQuery([
            ...searchQuery,
            { query: favoriteQuotes, type: 'favorites' },
          ])
        }}
      >
        Favorited
      </button>
      <br />
      <div className="presets__categories">{renderedCategoryButtons}</div>
    </div>
  )
}

export default Presets
