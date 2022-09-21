import React from "react";
import './index.css'

const MemeGenerated = (props) => {
    const {newMeme, memeImage} = props

    const [linkCopied, setLinkCopied] = React.useState(false)

    const twitterUrl = `https://twitter.com/intent/tweet?text=${memeImage}`
    const redditLink = `https://www.reddit.com/r/test/submit?title=Title%20to%20use&url=${memeImage}`
    const tumblrLink = `https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=${memeImage}`

    const copyUrl = () => {
        navigator.clipboard.writeText(memeImage)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
    }

    return (
        <div className="meme-generated-container">
            <img src = {memeImage} alt="meme" className="generated-image" />
            <div className="generated-buttons-container">
                <button onClick = {newMeme} className="copy-button">Create New Meme</button>
                <h1 className="share">Share this meme on: </h1>
                <p className="link-copy" style = {{display: linkCopied ? "block" : "none"}}>Link Copied to clipboard</p>
                <div className="social-media-container">
                    <a className="social-media-link" href = {twitterUrl} target = "__blank"><i className="icon fa-brands fa-square-twitter"></i></a>
                    <a className="social-media-link" href = "https://web.whatsapp.com" target = "__blank"><i className="icon fa-brands fa-square-whatsapp"></i></a>
                    <a className="social-media-link" href = {redditLink} target = "__blank"><i className="icon fa-brands fa-square-reddit"></i></a>
                    <a className="social-media-link" href = {tumblrLink} target = "__blank"><i className="icon fa-brands fa-square-tumblr"></i></a>
                    <button className="social-media-link copy-url-button" onClick = {copyUrl}><i className="icon fa-regular fa-copy"></i></button>
                </div>
            </div>
        </div>
    )
}

export default MemeGenerated