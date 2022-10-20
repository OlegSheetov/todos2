import { Component } from "react";
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'

const date1 = new Date(2021, 7, 19, 14)
const date2 = new Date(2021, 7, 19, 15, 23)

const initialData = [
  {
    title: 'Изучить реакт',
    desc: 'Да поскорее!',
    image: '',
    done: true,
    createdAt: date1.toLocaleDateString(),
    key: date1.getTime()
  },
  {
    title: 'Написать первое React-приложение',
    desc: 'Список запланированных дел',
    image: '',
    done: false,
    createdAt: date2.toLocaleDateString(),
    key: date2.getTime()
  }
]

export default class App extends Component {
  constructor(props) {
    super()
    this.state = { data : initialData }
    this.setDone = this.setDone.bind(this)
    this.delete = this.delete.bind(this)
    this.add = this.add.bind(this)
  } 
  add(deed) {
    this.state.data.push(deed)
    this.setState((state) => ({}))
  }
  setDone(key) {
    const deed = this.state.data.find((current) => current.key === key)
    if (deed) {
      deed.done = true
      this.setState((state) => ({}))
    }
  }
  delete(key) {
    const newData = this.state.data.filter(
      (current) => current.key !== key
    )
    this.setState((state) => ({data: newData}))
  }
  render() {
    return (
      <div>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <span className="navbar-item is-uppercase">
              Todos
            </span>
          </div>
        </nav>
        <main className="content px-6 mt-6">
          <TodoList
            list={this.state.data}
            setDone={this.setDone} 
            delete ={this.delete}
          />
          <TodoAdd add={this.add}/>
        </main>
      </div>
    )
  }
}