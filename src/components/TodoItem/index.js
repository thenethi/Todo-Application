import {useState} from 'react'

import Form from 'react-bootstrap/Form'

import './index.css'

const TodoItem = props => {
  const {todoItem, editCond, editChange, content, deleteItem} = props
  const {text, id} = todoItem
  const editBtn = () => {
    editChange(id)
  }
  const editContent = event => {
    content(event.target.value, id)
  }

  const [strikeThroughCSS, setStrikeThroughCSS] = useState(false)

  const deleteTodo = () => {
    deleteItem(id)
  }

  return (
    <li className="todo-item">
      <Form>
        <Form.Check
          type="checkbox"
          onClick={() => setStrikeThroughCSS(prev => !prev)}
          className="checkbox-items"
        />
      </Form>
      <div className="item-container">
        {editCond ? (
          <input
            type="text"
            value={text}
            onChange={editContent}
            className="input-container"
          />
        ) : (
          <p
            style={{
              textDecoration: strikeThroughCSS ? 'line-through' : 'none',
            }}
            className="todo-text"
          >
            {text}
          </p>
        )}
        <div>
          <button type="button" className="todo-buttons" onClick={editBtn}>
            {editCond ? 'Save' : 'Edit'}
          </button>
          <button type="button" className="todo-buttons" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoItem
