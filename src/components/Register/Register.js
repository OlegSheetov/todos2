import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { register } from '../api/api';
export default class Register extends Component {
  constructor(props) {
    super(props)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.clearFormData()
  }
  clearFormData() {
    this.formData = {
      email: '',
      password: ''
    }
  }
  handleEmailChange(evt) {
    this.formData.email = evt.target.value;
  }
  handlePasswordChange(evt) {
    this.formData.password = evt.target.value;
  }
  async handleFormSubmit(evt) {
    const result = await register(this.formData.email, this.formData.password)
    if (typeof result !== 'object') {
      console.log(result);
    }
    evt.preventDefault()
  }
  render() {
    if (this.props.currentUser) {
      return <Navigate to='/'></Navigate>
    }
    else {
      return (
        <section>
          <h1>Регистрация</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="field">
              <div className="lable">Адрес электроной почты.</div>
              <div className="contol">
                <input type="email" name="" className='input'
                onChange={this.handleEmailChange}/>
              </div>
            </div>
            <div className="field">
              <div className="lable">Пароль</div>
              <div className="control">
                <input type="password" name="" className='input' onChange={this.handlePasswordChange} />
              </div>
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <input type="reset"
                  value="Сброс"
                  className='button is-link is-light' />
              </div>
              <div className="control">
                <input type="submit" value="Зарегистрироваться" className='button is-primary' />
              </div>
            </div>
          </form>
        </section>
      )
    }
  }
}
