import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';

import CenteredSection from './CenteredSection';
import Form from './Form';
import messages from './messages';
import Wrapper from './Wrapper';
import Img from './Img';
import profile from './default_profile_pic.jpg';

//css
const Button = styled.button`
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
  background-color: #002147;
  color: #FFF;

  &:active {
    background: #fff;
    color: #000;
  }
`;

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
  background-color: #002147;
  color: #FFF;

  &:active {
    background: #fff;
    color: #000;
  }
`;

const LeftAlignSection = styled.section`
  text-align: left;
  padding-right: 15%;
`;

class ProfileForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';
		this.linkUser = '/students/1';

		this.state = {
			legalFirstName: "",
            legalLastName: "",
            major: "",
            minor: "",
            img: "",
            bio: ""
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handleMajorChange = this.handleMajorChange.bind(this);
		this.handleMinorChange = this.handleMinorChange.bind(this);
		this.handleBioChange = this.handleBioChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	/*
	componentWillMount() {
		localStorage.getItem('studentInfo') && this.setState({
				studentInfo: JSON.parse(localStorage.getItem('studentInfo')),
				isLoading: false
		})
	}
	*/

	componentDidMount() {

        fetch(this.link + this.linkUser)
        .then(response => response.json())
        .then(data => this.setState({
          legalFirstName: data.legalFirstName,
          legalLastName: data.legalLastName,
          major: data.major,
          minor: data.minor,
          img: data.img,
          bio: data.bio
       }))
	   .catch(error => console.log('parsing failed', error));

	}

	/* handle variable changes */

	handleFirstNameChange(e) {
		this.setState({ legalFirstName: e.target.value }, () => console.log('firstName:', this.state.firstName));
	}

	handleLastNameChange(e) {
		this.setState({ legalLastName: e.target.value }, () => console.log('lastName:', this.state.lastName));
	}

	handlePictureChange(e) {
		this.setState({ picture: e.target.value }, () => console.log('picture:', this.state.picture));
	}

	handleMajorChange(e) {
		this.setState({ major: e.target.value }, () => console.log('major:', this.state.major));
	}

	handleMinorChange(e) {
		this.setState({ minor: e.target.value }, () => console.log('minor:', this.state.minor));
	}

	handleBioChange(e) {
		this.setState({ bio: e.target.value }, () => console.log('bio:', this.state.bio));
	}
	
	/* handle forms */

	validateForm(){

		if(this.state.legalFirstName == ''){
			alert('Please enter your first name');
			return false;
		}
		else if(this.state.legalLastName == ''){
			alert('Please enter your last name');
			return false;
		}
		else if(this.state.major == ''){
			alert('Please enter a major');
			return false;
		}
		else if(this.state.bio == ''){
			alert('Please write a bio. Express yourself!');
			return false;
		}		
		else {
			return true;
		}
	}

	handleFormSubmit(e) {

		e.preventDefault();

		if(this.validateForm()){

			const formPayload = {
				legalFirstName: this.state.legalFirstName,
				legalLastName: this.state.legalLastName,
				img: this.state.img,
				major: this.state.major,
				minor: this.state.minor,
				bio: this.state.bio
			};

			fetch(this.link + this.linkUser, { //post profile updates to database :)
				method: 'post',
				headers: {
				  //"Content-type": "application/x-www-form-urlencoded",
				  //'Access-Control-Allow-Origin':'*',
				  'Accept': 'application/json',
				  'Content-Type': 'application/json',	
				},
				body: JSON.stringify(formPayload)					
			})
			.catch(error => console.log('parsing failed', error))

			alert('formPayload' + JSON.stringify(formPayload));
			
		}// end if
	}// end handleformsubmit

	render() {

        const { legalFirstName, legalLastName, major, minor, img, bio } = this.state;

        return(
        <div>
            <p>  {legalFirstName} {legalLastName} {major} {minor} {img} {bio} </p> 
        <Form onSubmit={this.handleFormSubmit}>
			{/* Profile pic, first/last name, major/minor */}
            <Wrapper>
          	<CenteredSection>
          		<p> Profile Picture </p>
            	<Img src={profile} alt="Profile Picture" />
					<SingleInput
						inputType={'text'}
						title={''}
						name={'picture'}
						controlFunc={this.handlePictureChange}
						content={img}
						placeholder={'No File Selected'} />
          		</CenteredSection>
          
          	<div>
          		<LeftAlignSection>
            		<p>First Name</p>
					<SingleInput
						inputType={'text'}
						title={''}
						name={'firstName'}
						controlFunc={this.handleFirstNameChange}
						content={legalFirstName}
						placeholder={"First Name"}/>	
          		</LeftAlignSection>

            	<LeftAlignSection>
            		<p>Major</p>
            		<SingleInput
						inputType={'text'}
						title={''}
						name={'major'}
						controlFunc={this.handleMajorChange}
						content={major}
						placeholder={'Major'} />	
          		</LeftAlignSection> 
         	</div>

          	<div>
          		<LeftAlignSection>
            		<p>Last Name</p>
            		<SingleInput
						inputType={'text'}
						title={''}
						name={'lastName'}
						controlFunc={this.handleLastNameChange}
						content={legalLastName}
						placeholder={'Last Name'} />	
         		</LeftAlignSection>

            	<LeftAlignSection>
             		<p>Minor</p>
            		<SingleInput
						inputType={'text'}
						title={''}
						name={'minor'}
						controlFunc={this.handleMinorChange}
						content={minor}
						placeholder={'Minor'} />
				</LeftAlignSection>
          	</div>
    	    </Wrapper>

        	{/* Bio */}
     		<Wrapper>
          		<CenteredSection>
            	<p> Bio </p>
					<TextArea
						inputType={'text'}
						rows={5}
						cols={100}
						resize={false}
						title={''}
						name={'bio'}
						controlFunc={this.handleBioChange}
						content={this.state.bio}
						placeholder={'Experience, details, and other juicy info goes here!'} />
          		</CenteredSection>
		    </Wrapper>

	      	{/* save, cancel, change password, deactivate account */}
    	  	<Wrapper>
        	  	<CenteredSection>
					<SubmitInput 
						type="submit"
						value="Save Changes" />
					<Button> Back </Button>

		        	<p> <a href="/studentProfile"> Change Password </a> </p>
        	    	<p> <a href="/studentProfile"> Deactivate Account </a> </p>
		        </CenteredSection>
      		</Wrapper>
	  	</Form>
	
    	</div>
		) //end return
		
	} // end render
}

export default ProfileForm;