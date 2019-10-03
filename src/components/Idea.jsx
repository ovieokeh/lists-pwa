import React from 'react'
import './Idea.less'

const Idea = ({ id, content, onDelete }) => (
  <div className="app__content__idea">
    <p className="app__content__idea__text">{content}</p>
    <button
      type="button"
      className="app__btn app__content__idea__btn"
      id={id}
      onClick={onDelete}
    >
      –
    </button>
  </div>
)

export default Idea
