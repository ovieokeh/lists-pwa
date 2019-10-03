import React from 'react'
import Idea from './components/Idea'
import './App.less'

const App = () => {
  const greeting = 'Idea Dump'

  const onIdeaDelete = event => {
    // do nothing
  }

  return (
    <div className="app">
      <h1 className="app__header">{greeting}</h1>

      <section className="app__content">
        <Idea content="Finish this tutorial" onDelete={onIdeaDelete} />
      </section>

      <form className="app__footer">
        <input
          type="text"
          className="app__footer__input"
          placeholder="Add a new idea"
        />
        <button type="submit" className="app__btn app__footer__submit-btn">
          +
        </button>
      </form>
    </div>
  )
}

export default App
