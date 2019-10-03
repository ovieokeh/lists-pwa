import React from 'react'
import './Idea.less'

const Idea = ({ content, onDelete }) => (
  <div className="app__content__idea">
    <p className="app__content__idea__text">{content}</p>
    <button
      type="button"
      className="app__btn app__content__idea__btn"
      onClick={onDelete}
    >
      –
    </button>
  </div>
)

export default Idea
