import React from 'react'
import './index.css'

const SearchSuggestions = (props) => {
    const {memesArr, inputText} = props
    const [suggestions, setSuggestions] = React.useState([]);

    React.useEffect(() => {
        const arr = [];
        for(let i = 0; i < memesArr.length; i++){
            if(memesArr[i].name.toLowerCase().includes(inputText.toLowerCase())){
                arr.push(memesArr[i])
            }
        }
        setSuggestions(arr.filter((item, index) => index < 10))
    }, [inputText, memesArr])

    return (
        <div className='search-suggestions-container'>
            {suggestions.length === 0 && <p className='suggestion'>No Results Found</p>}
            {suggestions.length !== 0 && suggestions.map((item, index) => <button  key = {index} className='suggestion'>{item.name}</button>)}
        </div>
    )
}

export default SearchSuggestions