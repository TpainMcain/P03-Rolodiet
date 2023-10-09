// React imports
import React, { useState } from 'react';

// Bootstrap imports
import { Form, Button, Alert } from 'react-bootstrap';

// Apollo Client import
import { useMutation } from '@apollo/client';

// Utils and mutations
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// CSS import
import './SignupForm.css';

const SignupForm = () => {
    // Local states for user data, form validation, and alert display
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Handle input changes by updating the userFormData state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Apollo Client mutation hook for user creation
    const [create] = useMutation(CREATE_USER);

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);

        const form = event.currentTarget;

        // Check if form fields are valid
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        try {
            const { data } = await create({ variables: { ...userFormData } });
            const { token, user } = data.createUser;

            // Log in user after successful sign up
            Auth.login(token);

        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        // Reset userFormData state
        setUserFormData({ username: '', password: '' });
    };

    return (
        <>
            <Form className='signup-form' noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert 
                    className='signup-alert' 
                    dismissible 
                    onClose={() => setShowAlert(false)} 
                    show={showAlert} 
                    variant='danger'>
                    We were unable to register your sign up!
                </Alert>

                {/* Username input field */}
                <Form.Group className='mb-3 signup-group'>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control
                        className='signup-input'
                        type='text'
                        placeholder='Your username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>

                {/* Password input field */}
                <Form.Group className='mb-3 signup-group'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        className='signup-input'
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>

                {/* Submit button */}
                <Button
                    className='signup-button'
                    disabled={!(userFormData.username && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;
