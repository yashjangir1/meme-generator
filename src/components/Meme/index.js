import React from 'react'
import './index.css'
import MemeGenerated from '../MemeGenerated'
import SearchSuggestions from '../SearchSuggestions'

const Meme = () => {
    const [memes, setMemes] = React.useState([])
    const [memeIndex, setMemeIndex] = React.useState(0);
    const [inputFieldArr, setInputFieldArr] = React.useState([])
    const [generated, setGenerated] = React.useState(false)
    const [generatedUrl, setGeneratedUrl] = React.useState('')
    const [searchText, setSearchText] = React.useState('')
    const [memeFound, setMemeFound] = React.useState(false)
    const [focused, setFocused] = React.useState(false)
    const [suggestions, setSuggestions] = React.useState([]);
    
    const searchInputEl = React.useRef(null)

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
    
    const skipMeme = () => {
        if(memeIndex === 99){
            setMemeIndex(0)
        }
        else{
            setMemeIndex(prevIndex => prevIndex + 1)
        }
    }
    
    const captionsUpdate = (e) => {
        setInputFieldArr(prevArr => prevArr.map((item, index) => {
            if(parseInt(e.target.id) === index){
                return e.target.value
            }
            return item
        }))
    }
    
    const generateMeme = () => {
        const param = new FormData()
        
        param.append('username', process.env.REACT_APP_IMGFLIP_USERNAME)
        param.append('password', process.env.REACT_APP_IMGFLIP_PASSWORD)
        param.append('template_id', memes[memeIndex].id)
        inputFieldArr.forEach((c, index) => param.append(`boxes[${index}][text]`, c))

        const postingMeme = async () => {
            try{
                const response = await fetch('https://api.imgflip.com/caption_image', {
                    method: 'POST',
                    body: param
                })  
                const data = await response.json()
                
                if(data.success){
                    setGenerated(true)
                    setGeneratedUrl(data.data.url)
                }
            }
            catch(e){
                console.log(e)
            }
        }
        postingMeme()
    }
    
    React.useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
        .then((response) => response.json())
        .then((data) => {
            setMemes(shuffle(data.data.memes))
        })

    }, [])
    
    React.useEffect(() => {
        const arr = []
        let i = 0;
        while(i < (memes.length !== 0 ? memes[memeIndex].box_count : 0)){
            arr.push('')
            i++
        }
        setInputFieldArr(arr);
    }, [memeIndex, memes])


    React.useEffect(() => {
        const arr = [];
        for(let i = 0; i < memes.length; i++){
            if(memes[i].name.toLowerCase().includes(searchText.toLowerCase())){
                arr.push(memes[i])
            }
        }
        setSuggestions(arr.filter((item, index) => index < 10))
    }, [searchText, memes])

    const newMeme = () => {
        setGenerated(false)
        skipMeme()
    }

    const simonGoBack = () => {
        if(memeIndex === 0){
            setMemeIndex(99)
        }
        else{
            setMemeIndex(prevIndex => prevIndex - 1)
        }
    }

    const searchInput = (e) => {
        setSearchText(e.target.value);
    }

    const searchMeme = () => {
        let notFound = true;
        memes.forEach((x, index) => {
            if(x.name.toLowerCase().includes(searchText.toLowerCase())){
                setMemeIndex(index)
                notFound = false;
            }
        })
        if(notFound){
            setMemeFound(true)
            setTimeout(() => setMemeFound(false), 1000)
        }
    }

    const changeFocus = () => {
        setFocused(prevFocus => !prevFocus);
    }

    const stayFocused = (e) => {
        searchInputEl.current.focus()
        setSearchText(e.target.textContent)
        memes.forEach((x, index) => {
            if(x.name.toLowerCase().includes(searchText.toLowerCase())){
                console.log(index)
                setMemeIndex(index)
            }
        })
        console.log(memeIndex)
    }

    return (
        !generated ? 
            (<div className='meme-container'>
                <div className='left-container'>
                    <div className='search-bar-and-suggestions'>
                        <div className='search-container'>
                            <input ref = {searchInputEl} onFocus = {changeFocus} type="search" className='search-bar' onChange = {searchInput} placeholder='Search for a meme' value = {searchText} />
                            <button className="search-button" onClick = {searchMeme}>Search</button>
                        </div>
                        {focused && <SearchSuggestions suggestions = {suggestions} stayFocused = {stayFocused} />}
                    </div>
                    {memeFound && <p className='not-found'>No meme found</p>}
                    <h1 className='meme-details'>Fill the below text boxes to create a meme: </h1>
                    <div className="input-container"> 
                        {inputFieldArr.map((arr, index) => <input value = {inputFieldArr[index]} id = {index} onChange = {captionsUpdate} placeholder = {`Text ${index + 1}`} key = {index} type="text" className='input-field' />)}
                    </div>
                    <div className='buttons-container'>
                        <button className='meme-button' onClick = {simonGoBack}>Back</button>
                        <button className='meme-button' onClick = {skipMeme}>Skip</button>
                    </div>
                    <button className='meme-button' onClick = {generateMeme}>Generate Meme</button>
                </div>
                <img alt="meme" src= {memes.length !== 0 ? memes[memeIndex].url : ""} className='meme' />
            </div>)
        :
            (<MemeGenerated memeImage = {generatedUrl} newMeme = {newMeme} />)
    )
}

export default Meme;