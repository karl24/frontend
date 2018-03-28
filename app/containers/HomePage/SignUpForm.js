import React, {Component} from 'react';
import styled from 'styled-components';
//import request from "../../../node_modules/superagent/superagent"; uninstall this dependency!!!

import SingleInput from 'components/FormComponents/SingleInput';
import Select from 'components/FormComponents/Select';
import Button from 'components/Button';

import CenteredSection from './CenteredSection';
import Form from './Form';

//button css
const SubmitInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  
  border: 2px solid #f5b01d;
  background: #f5b01d;
  color: #FFF;

  &:active {
    background: #002147;
    color: #FFF;
  }
`;

//form css


class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
			legalFirstName: '',
			legalLastName: '',
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',

			accountOptions: ['Student','Tutor'],
			accountSelection: ''
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.handleAccountOptionSelect = this.handleAccountOptionSelect.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
		
	}

	handleFirstNameChange(e) {
		this.setState({ legalFirstName: e.target.value }, () => console.log('legalFirstName:', this.state.legalFirstName));
	}

	handleLastNameChange(e) {
		this.setState({ legalLastName: e.target.value }, () => console.log('legalLastName:', this.state.legalLastName));
	}

	handleUserNameChange(e) {
		this.setState({ userName: e.target.value }, () => console.log('userName:', this.state.userName));
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value }, () => console.log('email:', this.state.email));
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value }, () => console.log('password:', this.state.password));
	}

	handleConfirmPasswordChange(e) {
		this.setState({ confirmPassword: e.target.value }, () => console.log('confirmPassword:', this.state.confirmPassword));
	}

	handleAccountOptionSelect(e) {
		this.setState({ accountSelection: e.target.value }, () => console.log('accountType:', this.state.accountSelection));
	}
	
	handleClearForm(e) {
		e.preventDefault();
		this.state = {
			legalFirstName: '',
			legalLastName: '',
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',

			accountOptions: ['Student','Tutor'],
			accountSelection: ''
		};
	}

	validateForm(){
		if(this.state.accountSelection == ''){
			alert('Please select an account type');
			return false;
		}
		else if(this.state.legalFirstName == ''){
			alert('Please enter your first name');
			return false;
		}
		else if(this.state.legalLastName == ''){
			alert('Please enter your last name');
			return false;
		}
		else if(this.state.userName == ''){
			alert('Please enter a user name');
			return false;
		}
		else if(this.state.email == ''){
			alert('Please enter your email');
			return false;
		}
		else if(this.state.password.length < 6){
			alert('Password must be at least 6 characters long');
			return false;
		}
		else if (this.state.password != this.state.confirmPassword){
			alert('Passwords do not match')
			return false;
		}		
		else {
			return true;
		}
	}

	handleFormSubmit(e) {

		e.preventDefault();

		if(this.validateForm()){

			//user Put
			if(this.state.accountSelection == 'Student'){

				const studentPayload = {
					userName: this.state.userName,
					email: this.state.email,
					passhash: this.state.password,
					userType: "student",
					legalFirstName: this.state.legalFirstName,
					legalLastName: this.state.legalLastName,
					bio: "",
					major: "",
					minor: "",
					img: "No Image Selected",
				};
		
				fetch('https://tutor-find.herokuapp.com/students', { //post entries to database :)
					method: 'put',
					headers: {
					  //"Content-type": "application/x-www-form-urlencoded",
					  //'Access-Control-Allow-Origin':'*',
					  'Accept': 'application/json',
					  'Content-Type': 'application/json',	
					},
					body: JSON.stringify(studentPayload)					
				})
				.catch(error => console.log('parsing failed', error))

				alert('studentPayload' + JSON.stringify(studentPayload));
			}// end user put

			//Tutor put
			else if (this.state.accountSelection == 'Tutor'){
				const tutorPayload = {
					userName: this.state.userName,
					email: this.state.email,
					passhash: this.state.password,
					userType: "tutor",
					legalFirstName: this.state.legalFirstName,
					legalLastName: this.state.legalLastName,
					degrees: "",
					links: "",
					bio: "",
					img: "No Image Selected",
				};
				
				fetch('https://tutor-find.herokuapp.com/tutors', { //post entries to database :)
					method: 'put',
					headers: {
					  //"Content-type": "application/x-www-form-urlencoded",
					  //'Access-Control-Allow-Origin':'*',
					  'Accept': 'application/json',
					  'Content-Type': 'application/json',	
					},
					body: JSON.stringify(tutorPayload)					
				})
				.catch(error => console.log('parsing failed', error))
	
				alert('tutorPayload' + JSON.stringify(tutorPayload));
			}//end tutor put

		}// end if validateForm()
	}//end handleformsubmit()

	render() {
		return (
			<div>
			<Form onSubmit={this.handleFormSubmit}>
			<p> I am a </p>
				<Select
					name={'accountSelection'}
					placeholder={'------'}
					controlFunc={this.handleAccountOptionSelect}
					options={this.state.accountOptions}
					selectedOption={this.state.accountSelection} />	
				<SingleInput
					inputType={'text'}
					title={''}
					name={'firstName'}
					controlFunc={this.handleFirstNameChange}
					content={this.state.legalFirstName}
					placeholder={'First Name'} />	
				<SingleInput
					inputType={'text'}
					title={''}
					name={'lastName'}
					controlFunc={this.handleLastNameChange}
					content={this.state.legalLastName}
					placeholder={'Last Name'} />	
				<SingleInput
					inputType={'text'}
					title={''}
					name={'userName'}
					controlFunc={this.handleUserNameChange}
					content={this.state.userName}
					placeholder={'User Name'} />	
				<SingleInput
					inputType={'email'}
					title={''}
					name={'email'}
					controlFunc={this.handleEmailChange}
					content={this.state.email}
					placeholder={'Email'} />
				<SingleInput
					inputType={'password'}
					title={''}
					name={'password'}
					controlFunc={this.handlePasswordChange}
					content={this.state.password}
					placeholder={'Password'} />		
				<SingleInput
					inputType={'password'}
					title={''}
					name={'confirmPassword'}
					controlFunc={this.handleConfirmPasswordChange}
					content={this.state.confirmPassword}
					placeholder={'Confirm Password'} />

				<SubmitInput
					type="submit"
					value="Sign Up"
					/>
			</Form>
			</div>
		);
	}
}

export default SignUpForm;