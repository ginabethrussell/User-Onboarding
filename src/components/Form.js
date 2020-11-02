import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

const initialFormState = {
    name: '',
    email: '',
    password: '',
    role: '',
    terms: true
}

export default function Form(){
    const [formState, setFormState] = useState(initialFormState);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        terms: ''
        });

    const formSchema = yup.object().shape({
        name: yup.string().matches(/[a-zA-Z\s]/, 'Name must only contain letters and spaces.'),
        email: yup.string().email('Please enter a valid email.'),
        password: yup.string().min(6 | 'password must contain 8 characters'),
        role: yup.string().min(1 | 'Please select a role.'),
        terms: yup.bool().oneOf([true])
    });
    const validateChange = (e) => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
          setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch(err => {
          console.log("error!", err);
          setErrors({ ...errors, [e.target.name]: err.errors[0] });
        });
    };
    console.log(errors);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          console.log("valid?", valid);
          setButtonDisabled(!valid);
        });
      }, [formState]);

    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value);
        e.persist();
        const newFormState = {
            ...formState, 
            [e.target.name]: e.target.type === "checkbox"? e.target.checked : e.target.value,
        }
        if(e.target.type === 'checkbox'){
            console.log('checkbox', e.target.checked);
        }
        validateChange(e);
        setFormState(newFormState);   
    }
    console.log(formState);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formState);
        setFormState(initialFormState);
        axios.post( 'https://reqres.in/api/users', formState)
        .then(response => console.log('Response:', response.data))
        .catch(err => console.log(err))
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
            {errors.name.length > 0? (<p className="errors">{errors.name}</p>): null}
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
             {errors.email.length > 0? (<p className="errors">{errors.email}</p>): null}
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
            {errors.password.length > 0? (<p className="errors">{errors.password}</p>): null}
            {/* Role */}
            <label htmlFor='role'>Role</label>
            <select id='role' name='role' required  onChange={onInputChange}>
                <option value=''>--select your role--</option>
                <option value='admin'>Admin</option>
                <option value='volunteer'>Volunteer</option>
                <option value='student'>Student</option>
            </select>
            {errors.role.length > 0? (<p className="errors">{errors.role}</p>): null}
            {/* Terms of Service Checkbox */}
            <label for="terms">Terms</label>
            <input 
            name='terms'
            type='checkbox' 
            id='terms' 
            checked = {formState.terms}
            onChange={onInputChange}
            />
            {errors.terms.length > 0? (<p className="errors">{errors.terms}</p>): null}
            {/* Submit Button */}
            <button disabled={buttonDisabled} type='submit'>Submit</button>
        </form>
    )
}