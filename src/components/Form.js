import React, { useState } from 'react';

const initialFormState = {
    name: '',
    email: '',
    password: '',
    role: '',
    terms: true
}

export default function Form(){
    const [formState, setFormState] = useState(initialFormState);

    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value);
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
            {/* Role */}
            <label htmlFor='role'>Role</label>
            <select id='role' name='role' required  onChange={onInputChange}>
                <option value=''>--select your role--</option>
                <option value='admin'>Admin</option>
                <option value='volunteer'>Volunteer</option>
                <option value='student'>Student</option>
            </select>
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