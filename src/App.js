import { Component } from "react";
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'
import TodoDetail from './components/TodoDetail/TodoDetail'
import { HashRouter, Route, Routes, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Register from './components/Register/Register'; 
import firebaseApp from './firebase'
import Login from "./components/Login/Login";
import { login } from "./components/api/api";
import Logout from "./components/Logout/Logout";
import { getList } from "./components/api/api";
import { setDone } from "./components/api/api";
import { del } from "./components/api/api";



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
    super(props)
    this.state = {
      data: [],
      showMenu: false,
      currentUser: undefined
    }
  
    this.setDone = this.setDone.bind(this)
    this.delete = this.delete.bind(this)
    this.add = this.add.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.getDeed = this.getDeed.bind(this)
    this.authStateChanged = this.authStateChanged.bind(this)
  }
  
  showMenu(evt) {
    evt.preventDefault()
    this.setState((state) => ({ showMenu: !state.showMenu }))
  }
  add(deed) {
    this.state.data.push(deed)
    this.setState((state) => ({}))
  }

  async setDone(key) {
    await setDone(this.state.currentUser , key)
    const deed = this.state.data.find((current) => current.key === key)
    if (deed) {
      deed.done = true
      this.setState((state) => ({}))
    }
  }
  async delete(key) {
    await del(this.state.currentUser, key)
    const newData = this.state.data.filter(
      (current) => current.key !== key
    )
    this.setState((state) => ({ data: newData }))

  }
  getDeed(key) {
    return this.state.data.find((current) => current.key === key)
  }
  async authStateChanged(user) {
    this.setState((state) => ({ currentUser: user }))
    if (user) {
      const newData = await getList(user)
      this.setState((state) => ({ data: newData}))
    } 
    else {
      this.setState((state)=> ({ data: []}))
    }
  }
  componentDidMount() {
    onAuthStateChanged(getAuth(firebaseApp), this.authStateChanged)
  }
  render() {
    return (
      <HashRouter>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <NavLink // это как гипперссылка на компонент или <a> тэг
              to='/'
              className={({ isActive }) =>
                " navbar-item is-uppercase "
                + (isActive ? ' is-active ' : '')
              }>
              {this.state.currentUser ? this.state.currentUser.email : 'Todos'}
            </NavLink>
            <a
              href="/"
              className={
                this.state.showMenu ?
                  'navbar-burger is-active' : 'navbar-burger'}
              onClick={this.showMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div
            className={this.state.showMenu ?
              'navbar-menu is-active' : 'navbar-menu'}
            onClick={this.showMenu}>
            <div className="navbar-start">
              {this.state.currentUser && (
                <NavLink to='/add'
                className={({ isActive }) =>
                  ' navbar-item ' + (isActive ? ' is-active ' : '')}>
                Создать дело
                </NavLink>
              )}
              {!this.state.currentUser && (
                  <NavLink to='/register'
                    className={({ isActive }) => 'navbar-item' + (isActive ? 'is-active' : '')}>
                    Зарегистрироваться
                  </NavLink>
                )
              }
              {!this.state.currentUser && (
                <NavLink to='/Login' className={({ isActive }) => 'navbar-item' + (isActive ? 'is-active' : '')}>Войти</NavLink>
              )}
            </div>
            {this.state.currentUser && (
              <div className="navbar-end">
                <NavLink to='/logout' className={({ isActive }) => 'navbar-item' + (isActive ? 'is-active' : '')}>Выйти</NavLink>
              </div>
            )}
          </div>
        </nav>
        <main className="content px-6 mt-6">
          <Routes>
            <Route path='/' element={
              <TodoList
                list={this.state.data}
                setDone={this.setDone}
                delete={this.delete}
              />
            } />
            <Route path='/add' element={
              <TodoAdd add={this.add}
                currentUser={this.state.currentUser} />
            }
            />
            <Route path="/:key"
              element={<TodoDetail getDeed={this.getDeed} />}>
            </Route>
            <Route path="/register"
              element={
                <Register currentUser={this.state.currentUser}/>}>
            </Route>
            <Route path="/Login"
              element={<Login currentUser={this.state.currentUser} />}>
            </Route>
            <Route path="/Logout"
              element={
                <Logout currentUser={this.state.currentUser}/>}></Route>
          </Routes>
        </main>
      </HashRouter>
    )
  }
}