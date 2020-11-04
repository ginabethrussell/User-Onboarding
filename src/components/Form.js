import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

const initialFormState = {
    name: '',
    email: '',
    password: '',
    role: '',
    product1: '',
    product2: '',
    product3: '',
    terms: true
}

export default function Form(props){
    const [formState, setFormState] = useState(initialFormState);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        product1: '',
        product2: '',
        product3: '',
        terms: ''
        });
    const [users, setUsers] = useState([]);
    const {updateTeam} = props;

    const formSchema = yup.object().shape({
        name: yup.string().matches(/[a-zA-Z\s]/, 'Name is required and must only contain letters and spaces.'),
        email: yup.string().email('Please enter a valid email.').notOneOf(['waffles@syrup.com'], 'That email is already taken.'),
        password: yup.string().min(6,'Password must contain 6 characters'),
        role: yup.string().min(1,'Please select a role.'),
        product1: yup.string(),
        product2: yup.string(),
        product3: yup.string(),
        terms: yup.bool().oneOf([true],"You must agree to the terms and conditions.")
    });

    const validateChange = (e) => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.type === "checkbox"? e.target.checked : e.target.value)
        .then(valid => {
          setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch(err => {
          console.log("error!", err);
          setErrors({ ...errors, [e.target.name]: err.errors[0] });
        });
    };

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
    
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          console.log("valid?", valid);
          setButtonDisabled(!valid);
        });
      }, [formState]);

    useEffect(() => {
        updateTeam(users);
        console.log('....updating team');
    }, [users]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formState);
        axios.post( 'https://reqres.in/api/users', formState)
        .then(response => {
            setUsers([...users, response.data]);
            setFormState(initialFormState);
        })
        .catch(err => console.log(err))
        
    }

    return(
        <form onSubmit={submitForm} className='form'>
            <div className="form-group">
            {/* Name */}
            <label htmlFor='name'>Name</label>
            <input 
            name = 'name'
            type='text'
            id = 'name'
            data-cy='name'
            placeholder = 'name'
            value = {formState.name}
            required
            onChange={onInputChange}
            />
            {errors.name.length > 0? (<p className="errors">{errors.name}</p>): null}
            </div>
            <div className="form-group">
            {/* Email */}
            <label htmlFor='email'>Email</label>
            <input 
            name = 'email'
            type='email'
            id = 'email'
            data-cy='email'
            placeholder = 'email'
            value = {formState.email}
            required
            onChange={onInputChange}
            />
             {errors.email.length > 0? (<p className="errors">{errors.email}</p>): null}
             </div>
             <div className="form-group">
            {/* Password */}
            <label htmlFor='password'>Password</label>
            <input 
            name = 'password'
            type='password'
            id = 'password'
            data-cy='password'
            placeholder = 'password'
            value = {formState.password}
            required
            onChange={onInputChange}
            />
            {errors.password.length > 0? (<p className="errors">{errors.password}</p>): null}
            </div>
            <div className='form-group'>
            {/* Role */}
            <label htmlFor='role'>Role</label>
            <select id='role' name='role' value={formState.role} required onChange={onInputChange}>
                <option value=''>--select your role--</option>
                <option value='UI'>UI Designer</option>
                <option value='Front End I'>Front End Developer I</option>
                <option value='Front End II'>Front End Developer II</option>
                <option value='Back End'>Back End Developer</option>
                <option value='PL'>Project Lead</option>
            </select>
            {errors.role.length > 0? (<p className="errors">{errors.role}</p>): null}
            </div>
            <h3>Marketing Products Preference</h3>
            <div className='form-group'>
            {/* Product Choice 1 */}
            <label htmlFor='product1'>Product 1st Choice</label>
            <select id='product1' name='product1' value={formState.product1} onChange={onInputChange}>
                <option value=''>--select your first choice--</option>
                <option value='African Marketplace'>African Marketplace</option>
                <option value='Anywhere Fitness'>Anywhere Fitness</option>
                <option value='Better Professor App'>Better Professor App</option>
                <option value='Co-Make'>Co-Make</option>
                <option value='DevDesk Queue'>DevDesk Queue</option>
                <option value='How-To'>How-To</option>
                <option value='Pintereach'>Pintereach</option>
                <option value='Expat Journal'>Expat Journal</option>
                <option value='FoodTruck TrackR'>FoodTruck TrackR</option>
                <option value='Potluck Planner'>Pot Luck Planner</option>
                <option value='School in the Cloud'>School in the Cloud</option>
                <option value='Secret Family Recipes'>Secret Family Recipes</option>
            </select>
            {errors.product1.length > 0? (<p className="errors">{errors.product1}</p>): null}
            </div>
            <div className='form-group'>
            {/* Product Choice 2 */}
            <label htmlFor='product12'>Product 2nd Choice</label>
            <select id='product2' name='product2' value={formState.product2} onChange={onInputChange}>
            <option value=''>--select your second choice--</option>
                <option value='African Marketplace'>African Marketplace</option>
                <option value='Anywhere Fitness'>Anywhere Fitness</option>
                <option value='Better Professor App'>Better Professor App</option>
                <option value='Co-Make'>Co-Make</option>
                <option value='DevDesk Queue'>DevDesk Queue</option>
                <option value='How-To'>How-To</option>
                <option value='Pintereach'>Pintereach</option>
                <option value='Expat Journal'>Expat Journal</option>
                <option value='FoodTruck TrackR'>FoodTruck TrackR</option>
                <option value='Potluck Planner'>Pot Luck Planner</option>
                <option value='School in the Cloud'>School in the Cloud</option>
                <option value='Secret Family Recipes'>Secret Family Recipes</option>
            </select>
            {errors.product2.length > 0? (<p className="errors">{errors.product2}</p>): null}
            </div>
            <div className='form-group'>
            {/* Product Choice 3 */}
            <label htmlFor='product3'>Product 3rd Choice</label>
            <select id='product3' name='product3' value={formState.product3} onChange={onInputChange}>
            <option value=''>--select your third choice--</option>
                <option value='African Marketplace'>African Marketplace</option>
                <option value='Anywhere Fitness'>Anywhere Fitness</option>
                <option value='Better Professor App'>Better Professor App</option>
                <option value='Co-Make'>Co-Make</option>
                <option value='DevDesk Queue'>DevDesk Queue</option>
                <option value='How-To'>How-To</option>
                <option value='Pintereach'>Pintereach</option>
                <option value='Expat Journal'>Expat Journal</option>
                <option value='FoodTruck TrackR'>FoodTruck TrackR</option>
                <option value='Potluck Planner'>Pot Luck Planner</option>
                <option value='School in the Cloud'>School in the Cloud</option>
                <option value='Secret Family Recipes'>Secret Family Recipes</option>
            </select>
            {errors.product3.length > 0? (<p className="errors">{errors.product3}</p>): null}
            </div>
            <div className="form-group checkbox-group">
            {/* Terms of Service Checkbox */}
            <label htmlFor="terms">Terms</label>
            <input 
            name='terms'
            type='checkbox' 
            id='terms' 
            data-cy='terms'
            checked = {formState.terms}
            onChange={onInputChange}
            />
            {errors.terms.length > 0? (<p className="errors">{errors.terms}</p>): null}
            </div>
            {/* Submit Button */}
            <button data-cy='submit' disabled={buttonDisabled} type='submit'>Submit</button>
            {/* <pre width='300px'>{JSON.stringify(users, null, 2)}</pre> */}
        </form>
    )
}