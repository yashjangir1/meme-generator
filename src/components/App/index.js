import "./index.css"
import Meme from '../Meme'

function App() {
  return (
    <div className="main-container">
      <header className="header">
          <img alt = "meme generator logo" src = "https://www.kindpng.com/picc/m/410-4105079_decent-memes-png-logo-harry-potter-starbucks-transparent.png" className="logo" />
          <h1 className="heading">Meme generator</h1>
      </header>
      <Meme/>
    </div>
  );
}

export default App;
