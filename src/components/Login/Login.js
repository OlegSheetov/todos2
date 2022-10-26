import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { Component } from 'react';
import { login } from '../api/api';


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleFormOnSubmit = this.handleFormOnSubmit.bind(this)
    this.handleEmailOnChange = this.handleEmailOnChange.bind(this)
    this.clearformData()
  }
  clearformData() {
    this.formData = {
      email: '',
      password:''
    }
  }
  async handleFormOnSubmit(evt) {
     const result = await login (this.formData.email , this.formData.password)
  }
  handleEmailOnChange(evt) {
    this.formData.email = evt.target.value
  }
  handelPasswordOnChange(evt) {
    this.formData.password = evt.target.value
  }
  render() {
    return (
      <section>
        <h1>Вход</h1>
        <form onChange={this.handleFormOnSubmit} >
          <lable className="lable">Email</lable>
          <div className="control">
            <input type="email"  className='input' onChange={this.handleEmailOnChange} />
          </div>
          <lable className="lable">Пароль</lable>
          <div className="control">
            <input type="password"  className='input'
            onChange={this.handelPasswordOnChange}/>
          </div>
          <div className="field is-grouped is-grouped-right">
            <div className="control pt-2">
              <input type="submit" value="Вход" className='button is-primary'/>
            </div>
            <div className="control pt-2">
              <input type="submit" value="Сброс" className='button is-light is-link' />
            </div>
          </div>
        </form>
      </section>
    )
  }
}