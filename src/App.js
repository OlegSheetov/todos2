import { Component } from "react";
import Todolist from './components/TodoList/Todolist'

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
    this.data = initialData
    this.setDone = this.setDone.bind(this)
  }
  setDone(key) {
    const deed = this.data.find((current) => current.key === key)
    if (deed) {
      deed.done = true
    }
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
          <Todolist list={this.data} setDone={this.setDone} />
        </main>
      </div>
    )
  }
}