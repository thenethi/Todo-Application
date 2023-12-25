import {Component} from 'react'

import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import Todologo from '../todologo.svg'

import './index.css'

const initialTodoList = [
  {
    text: 'Programming',
    id: uuidv4(),
    isChecked: false,
  },
  {
    text: 'Drinking Water',
    id: uuidv4(),
    isChecked: false,
  },
  {
    text: 'Exercise',
    id: uuidv4(),
    isChecked: false,
  },
]

class Home extends Component {
  state = {inputVal: '', todoList: initialTodoList, editState: false}

  onChangeInput = event => {
    this.setState({inputVal: event.target.value})
  }

  onAddItem = () => {
    const {inputVal} = this.state
    const newItem = {
      text: inputVal,
      id: uuidv4(),
      isChecked: false,
    }
    this.setState(prev => ({
      todoList: [...prev.todoList, newItem],
      inputVal: '',
    }))
  }

  onEditState = () => {
    this.setState(prev => ({editState: !prev.editState}))
  }

  onEditContent = (val, id) => {
    const {todoList} = this.state
    const filteredList = todoList.map(each => {
      if (each.id === id) {
        return {...each, text: val}
      }
      return each
    })
    this.setState({todoList: filteredList})
  }

  deleteTodos = id => {
    const {todoList} = this.state
    const deletedItem = todoList.filter(each => each.id !== id)
    this.setState({todoList: deletedItem})
  }

  logOutBtn = () => {
    const {history} = this.props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {inputVal, todoList, editState} = this.state
    const jwt = Cookie.get('jwt_token')
    if (jwt === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="todo-container">
        <div className="header-section">
          <div className="header-title-container">
            <img src={Todologo} alt="todo-logo" className="image" />
            <h1 className="heads-1">Todo List</h1>
          </div>
          <button type="button" onClick={this.logOutBtn} className="add-button">
            Log out
          </button>
        </div>
        <h1 className="heads-2">Create Task</h1>
        <input
          type="text"
          placeholder="Enter your Task"
          value={inputVal}
          onChange={this.onChangeInput}
          className="task-input"
        />
        <div>
          <button type="button" onClick={this.onAddItem} className="add-button">
            Add
          </button>
        </div>
        <div>
          <h1 className="heads-2">My Tasks</h1>
          <ul type="none" className="list-items">
            {todoList.map(each => (
              <TodoItem
                key={each.id}
                todoItem={each}
                editCond={editState}
                editChange={this.onEditState}
                content={this.onEditContent}
                deleteItem={this.deleteTodos}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
