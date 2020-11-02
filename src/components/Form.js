import React from 'react';

export default function Form(){
    return(
        <div className='form'>
            {/* Name */}
            <label htmlFor='name'>Name</label>
            <input 
            name = 'name'
            type='text'
            id = 'name'
            placeholder = 'name'
            // value = ''
            required
            />
            {/* Email */}
            <label htmlFor='email'>Email</label>
            <input 
            name = 'email'
            type='email'
            id = 'email'
            placeholder = 'email'
            // value = ''
            required
            />
            {/* Password */}
            <label htmlFor='password'>Password</label>
            <input 
            name = 'password'
            type='password'
            id = 'password'
            placeholder = 'password'
            // value = ''
            required
            />
            {/* Terms of Service Checkbox */}
            <label for="terms">Terms</label>
            <input 
            name='terms'
            type='checkbox' 
            id='terms' 
            checked
            />
            {/* Submit Button */}
            <button disabled={false} type='submit'>Submit</button>
        </div>
    )
}