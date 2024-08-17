import React from 'react'
import Spinner from '../Components/Common/Spinner'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function Login() {
  const {register,handleSubmit,formState: {errors}} = useForm();
  const {loading} = useSelector((state) => state.auth)
  if(loading){
    return (<Spinner/>)
  }
  return (
    <div>
        <form>
            <div>
                <label htmlFor="role">Select your role:</label>
                <select id="account_type" {...register('account_type')} defaultValue="Student">
                    <option value="Student">Student</option>
                    <option value="Dhobi">Dhobi</option>
                    <option value="Saloon">Saloon</option>
                    <option value="Cycle">Cycle</option>
                    <option value="Magaram">Magaram</option>
                </select>
            </div>
            <div>
                <label className=''>Email Address<sup className=''>*</sup></label>
            </div>
        </form>
    </div>
  )
}
