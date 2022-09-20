import React from "react";

const MemeGenerated = (props) => {
    return (
        <div className="meme-generated-container">
            <img src = {props.memeImage} alt="meme" />
        </div>
    )
}

export default MemeGenerated