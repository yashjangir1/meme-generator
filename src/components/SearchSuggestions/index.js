import React from 'react'
import './index.css'

const SearchSuggestions = (props) => {
    const {stayFocused, suggestions} = props

    return (
        <div className='search-suggestions-container'>
            {suggestions.length === 0 && <p className='suggestion'>No Results Found</p>}
            {suggestions.length !== 0 && suggestions.map((item, index) => <button onClick = {stayFocused} key = {index} className='suggestion'>{item.name}</button>)}
        </div>
    )
}

export default SearchSuggestions