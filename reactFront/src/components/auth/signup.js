import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

// hoisted up not to render each time from scratch in the component (which would result in loosing focus)
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  return (
    <fieldset className="form-group">
      <label htmlFor={input.name}>{label}</label>
      <input className="form-control" {...input} type={type} />
      {touched && error && <span className="text-danger">{error}</span>}
    </fieldset>
  );
};

class SignUp extends Component {

  handleFormSubmit({ email, password }) {
    // Sign user up
    this.props.signupUser({ email, password })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      console.log('hello')
      return (
        <div className="alert alert-danger">
         <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <Field name="email" component={renderField} type="email" label="Email"/></div>
        <div className="form-group">
          <Field name="password" component={renderField} type="password" label="Password"/></div>
        <div className="form-group">
          <Field name="password_confirmation" component={renderField} type="password" label="Password Confirmation"/></div>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  let errors = {}
  console.log(values)

  if ( !values.email ) {
    errors.email = "Please enter an email"
  }

  if ( !values.password ) {
    errors.password = "Please enter a password"
  }

  if (values.password != values.password_confirmation) {
    errors.password = 'Password and password confirmation don\'t match!'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form:'signup',
  validate
}, null)(SignUp));
