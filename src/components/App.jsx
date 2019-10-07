import React, { useState, useEffect, useRef } from 'react'
import Idea from './Idea'
import { withFirebase } from '../firebase/withFirebase'
import * as theme from '../theme'
import './App.less'

const App = props => {
  const { ideasCollection } = props.firebase

  const ideasContainer = useRef(null)
  const [idea, setIdeaInput] = useState('')
  const [ideas, setIdeas] = useState([])
  const [currentTheme, setCurrentTheme] = useState('lightTheme')

  const toggleTheme = () => {
    const newTheme = currentTheme === 'lightTheme' ? 'darkTheme' : 'lightTheme'
    setCurrentTheme(newTheme)
  }

  useEffect(() => {
    const selectedTheme = theme[currentTheme]

    Object.keys(selectedTheme).forEach(variable => {
      document.documentElement.style.setProperty(
        variable,
        selectedTheme[variable]
      )
    })
  }, [currentTheme])

  useEffect(() => {
    const unsubscribe = ideasCollection
      .orderBy('timestamp', 'desc')
      .onSnapshot(({ docs }) => {
        const ideasFromDB = []

        docs.forEach(doc => {
          const details = {
            id: doc.id,
            content: doc.data().idea,
            timestamp: doc.data().timestamp
          }

          ideasFromDB.push(details)
        })

        setIdeas(ideasFromDB)
      })

    return () => unsubscribe()
  }, [])

  const onIdeaDelete = event => {
    const { id } = event.target
    ideasCollection.doc(id).delete()
  }

  const onIdeaAdd = event => {
    event.preventDefault()

    if (!idea.trim().length) return

    setIdeaInput('')
    ideasContainer.current.scrollTop = 0 // scroll to top of container

    ideasCollection.add({
      idea,
      timestamp: new Date()
    })
  }

  const renderIdeas = () => {
    if (!ideas.length)
      return <h2 className="app__content__no-idea">Add a new Idea...</h2>

    return ideas.map(idea => (
      <Idea key={idea.id} idea={idea} onDelete={onIdeaDelete} />
    ))
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__header__h1">Idea Box</h1>
        <button
          type="button"
          className="app__btn theme-toggle"
          onClick={toggleTheme}
        >
          {currentTheme === 'lightTheme' ? '🌑' : '🌕'}
        </button>
      </header>

      <section ref={ideasContainer} className="app__content">
        {renderIdeas()}
      </section>

      <form className="app__footer" onSubmit={onIdeaAdd}>
        <input
          type="text"
          className="app__footer__input"
          placeholder="Add a new idea"
          value={idea}
          onChange={e => setIdeaInput(e.target.value)}
        />
        <button type="submit" className="app__btn app__footer__submit-btn">
          +
        </button>
      </form>
    </div>
  )
}

export default withFirebase(App)
