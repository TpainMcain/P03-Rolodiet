import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';

import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import './LoginForm.css';

const LoginForm = () => {
    // State for form data, validation, and alert
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Handle input changes and update userFormData state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Apollo Client mutation hook for user login
    const [login] = useMutation(LOGIN_USER);
    
    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        // Perform form validation
        setValidated(true);
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
            return;
        }

        try {
            // Attempt to log in
            const { data } = await login({
                variables: { ...userFormData },
            });

            // On successful login, authenticate the user
            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        // Reset form fields
        setUserFormData({
            username: '',
            password: '',
        });
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='loginForm'>
            <Alert 
                dismissible 
                onClose={() => setShowAlert(false)} 
                show={showAlert} 
                variant='danger' 
                className='loginFormAlert'
            >
                Something went wrong with your login credentials!
            </Alert>

            <FormInput 
                type='text'
                name='username'
                placeholder='Your username'
                value={userFormData.username}
                onChange={handleInputChange}
                label='Username'
            />

            <FormInput 
                type='password'
                name='password'
                placeholder='Your password'
                value={userFormData.password}
                onChange={handleInputChange}
                label='Password'
            />

            <Button
                disabled={!(userFormData.username && userFormData.password)}
                type='submit'
                variant='success'
                className='loginFormButton'
            >
                Submit
            </Button>
        </Form>
    );
};

// Helper component for Form input fields
const FormInput = ({ type, name, placeholder, value, onChange, label }) => (
    <Form.Group className='mb-3 loginFormInputGroup'>
        <Form.Label htmlFor={name} className='loginFormLabel'>{label}</Form.Label>
        <Form.Control
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            required
            className='loginFormControl'
        />
        <Form.Control.Feedback type='invalid' className='loginFormInvalidFeedback'>
            {label} is required!
        </Form.Control.Feedback>
    </Form.Group>
);

export default LoginForm;
