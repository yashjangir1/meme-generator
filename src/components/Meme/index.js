import React from 'react'
import './index.css'

const Meme = () => {
    const [memes, setMemes] = React.useState([])
    const [memeIndex, setMemeIndex] = React.useState(0);
    const [inputFieldArr, setInputFieldArr] = React.useState([])

    const skipMeme = () => {
        if(memeIndex === 99){
            setMemeIndex(0)
        }
        else{
            setMemeIndex(prevIndex => prevIndex + 1)
        }
    }

    const imgUrl = memes[memeIndex].url
    const box_count = memes[memeIndex].box_count;

    React.useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
           .then((response) => response.json())
           .then((data) => {
               setMemes(data.data.memes)
           })
    }, [])

    React.useEffect(() => {
        const arr = []
        let i = 0;
        while(i < box_count){
            arr.push('')
            i++
        }
        setInputFieldArr(arr);
    }, [memeIndex])

    return (
        <div className='meme-container'>
            <div className='left-container'>
                <div className="input-container"> 
                    {inputFieldArr.map((arr, index) => <input placeholder = {`Text ${index + 1}`} key = {index} type="text" className='input-field' />)}
                </div>
                <div className='buttons-container'>
                    <button className='meme-button' onClick = {skipMeme}>Skip</button>
                    <button className='meme-button'>Generate</button>
                </div>
            </div>
            <img alt="meme" src= {imgUrl} className='meme' />
        </div>
    )
}

export default Meme;