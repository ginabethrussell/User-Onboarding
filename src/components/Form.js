import React, { useState } from 'react';

const initialFormState = {
    name: '',
    email: '',
    password: '',
    terms: true
}

export default function Form(){
    const [formState, setFormState] = useState(initialFormState);

    const onInputChange = (e) => {
        const newFormState = {
            ...formState, 
            [e.target.name]: e.target.type === "checkbox"? e.target.checked : e.target.value,
        }
        setFormState(newFormState);
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formState);
        setFormState(initialFormState);
    }

    return(
        <form onSubmit={submitForm} className='form'>
            {/* Name */}
            <label htmlFor='name'>Name</label>
            <input 
            name = 'name'
            type='text'
            id = 'name'
            placeholder = 'name'
            value = {formState.name}
            required
            onChange={onInputChange}
            />
            {/* Email */}
            <label htmlFor='email'>Email</label>
            <input 
            name = 'email'
            type='email'
            id = 'email'
            placeholder = 'email'
            value = {formState.email}
            required
            onChange={onInputChange}
            />
            {/* Password */}
            <label htmlFor='password'>Password</label>
            <input 
            name = 'password'
            type='password'
            id = 'password'
            placeholder = 'password'
            value = {formState.password}
            required
            onChange={onInputChange}
            />
            {/* Terms of Service Checkbox */}
            <label for="terms">Terms</label>
            <input 
            name='terms'
            type='checkbox' 
            id='terms' 
            checked = {formState.terms}
            onChange={onInputChange}
            />
            {/* Submit Button */}
            <button disabled={false} type='submit'>Submit</button>
        </form>
    )
}