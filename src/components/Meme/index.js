import React from 'react'
import './index.css'
import MemeGenerated from '../MemeGenerated'

const Meme = () => {
    const [memes, setMemes] = React.useState([])
    const [memeIndex, setMemeIndex] = React.useState(0);
    const [inputFieldArr, setInputFieldArr] = React.useState([])
    const [generated, setGenerated] = React.useState(false)
    const [generatedUrl, setGeneratedUrl] = React.useState('')


    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
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

    console.log(process.env.REACT_APP_IMGFLIP_USERNAME)
    
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
                console.log(data)
                
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
        
    let imgUrl = memes.length !== 0 ? memes[memeIndex].url : ""
    let box_count = memes.length !== 0 ? memes[memeIndex].box_count : 0
    
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
        while(i < box_count){
            arr.push('')
            i++
        }
        setInputFieldArr(arr);
    }, [memeIndex])

    console.log(inputFieldArr)

    return (
        !generated ? 
            (<div className='meme-container'>
                <div className='left-container'>
                    <div className="input-container"> 
                        {inputFieldArr.map((arr, index) => <input value = {inputFieldArr[index]} id = {index} onChange = {captionsUpdate} placeholder = {`Text ${index + 1}`} key = {index} type="text" className='input-field' />)}
                    </div>
                    <div className='buttons-container'>
                        <button className='meme-button' onClick = {skipMeme}>Skip</button>
                        <button className='meme-button' onClick = {generateMeme}>Generate</button>
                    </div>
                </div>
                <img alt="meme" src= {imgUrl} className='meme' />
            </div>)
        :
            (<MemeGenerated memeImage = {generatedUrl} />)
    )
}

export default Meme;