import React, { useState, useEffect } from 'react'
import Idea from './components/Idea'
import { withFirebase } from './firebase/withFirebase'
import './App.less'

const App = props => {
  const { ideasCollection } = props.firebase

  const [idea, setIdeaInput] = useState('')
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    const dbListener = ideasCollection.onSnapshot(({ docs }) => {
      const ideasFromDB = []

      docs.forEach(doc => {
        const details = {
          id: doc.id,
          content: doc.data().idea,
          timestamp: doc.data().timestamp
        }

        ideasFromDB.push(details)
      })

      ideasFromDB.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))

      setIdeas(ideasFromDB)
    })

    return () => dbListener()
  }, [])

  const onIdeaDelete = event => {
    const id = event.target.id
    ideasCollection.doc(id).delete()
  }

  const addIdea = event => {
    event.preventDefault()

    setIdeaInput('')

    ideasCollection.add({
      idea,
      timestamp: new Date()
    })
  }

  const renderIdeas = () => {
    if (!ideas.length)
      return <h2 className="app__content__no-idea">Add a new Idea...</h2>

    return ideas.map(idea => (
      <Idea
        key={idea.id}
        id={idea.id}
        content={idea.content}
        onDelete={onIdeaDelete}
      />
    ))
  }

  return (
    <div className="app">
      <h1 className="app__header">Idea Dump</h1>

      <section className="app__content">{renderIdeas()}</section>

      <form className="app__footer" onSubmit={addIdea}>
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
