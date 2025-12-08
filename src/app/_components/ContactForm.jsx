"use client"
import axios from 'axios';
import React, { useState } from 'react'
import useSWRMutation from "swr/mutation";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'
import ScaleLoader from "react-spinners/ScaleLoader"

const createOrUpdateContact = async (url, { arg }) => {
  let res = null
  const { method, data } = arg

  if(method == "PUT") {
    res = await axios.put(url, data)
  }
  else {
    res = await axios.post(url, data)
  }  

  if(res.data.status) {
    return res.data.data
  } else {
    const errorData = res.data
    const error = new Error(errorData.data)
    error.message = errorData.data
    error.status = errorData.status
    error.statusCode = errorData.statusCode
    throw error
  }
}

const ContactForm = ({url, contactDetails = null}) => {
  const router = useRouter()
  const [name, setName] = useState(contactDetails ? contactDetails?.name : "")
  const [nameError, setNameError] = useState('')
  const [email, setEmail] = useState(contactDetails ? contactDetails?.email : "")
  const [emailError, setEmailError] = useState('')
  const [phone, setPhone] = useState(contactDetails ? contactDetails?.phone : "")
  const [phoneError, setPhoneError] = useState('')
  const [commonError, setCommonError] = useState('')

  const { trigger, isMutating, error } = useSWRMutation(url, createOrUpdateContact)



  const handleSubmit = async (e) => {
    e.preventDefault()

    setNameError("")
    setEmailError("")
    setPhoneError("")
    setCommonError("")

    console.log("REACHED IN SUBMIT")
    if(!name) {
      setNameError('Name is neccossory!')
      return
    }
    else if(name.length < 3) {
      setNameError("Name should be have atleast 3 letters!")
      return
    }
    else if(!email) {
      setEmailError('Email is neccessory!')
      return
    }
    else if(!phone) {
      setPhoneError('Phone is neccessory!')
      return
    }
    else if(phone.length == 9) {
      setPhoneError('Phone number should have 10 numbers!')
      return
    }

    console.log(name, email, phone)

    try {
      await trigger({
        method: contactDetails ? "PUT" : "POST",
        data: {
          name: name, 
          email: email, 
          phone: phone
        }
      })
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Contact ${contactDetails ? "Updated" : "Created"} Successfully!`,
        showConfirmButton: false,
        timer: 1500
      }).finally(() => {
        setName("")
        setEmail("")
        setPhone("")
        setNameError("")
        setEmailError("")
        setPhoneError("")
        setCommonError("")

        router.push("/")
      })
    } catch (error) {
      if(error?.statusCode == 401) {
        router.push("/login")
      }
      else if(error?.statusCode == 409) {
        setPhoneError(error?.message)
        return
      }
      else {
        setCommonError(error?.message)
        return
      }
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className='space-y-6' action="">
      <div>
        <label className={`text-[13px] ml-0.5 font-medium ${nameError || commonError ? "text-red-600" : "text-black"}`} htmlFor="name">
          {
            nameError ? nameError : commonError ? commonError : "Name"
          }
        </label>
        <input onChange={(e) => setName(e.target.value)} value={name} id="name" type="text" placeholder="Enter name" 
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'/>
      </div>
      <div>
        <label className={`text-[13px] ml-0.5 font-medium ${emailError ? "text-red-600" : "text-black"}`} htmlFor="email">
          {
            emailError ? emailError : "Email"
          }
        </label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" type="text" placeholder="Enter email" 
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'/>
      </div>
      <div>
        <label className={`text-[13px] ml-0.5 font-medium ${phoneError ? "text-red-600" : "text-black"}`} htmlFor="phone">
          {
            phoneError ? phoneError : "Phone"
          }
        </label>
        <input onChange={(e) => setPhone(e.target.value)} value={phone} id="phone" type="text" placeholder="Enter phone" 
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'/>
      </div>
      <button disabled={isMutating} type='submit' className='w-full text-white bg-blue-600 rounded-md py-2 cursor-pointer text-sm'>
        {
          isMutating ? (
            <ScaleLoader 
            color="white"
            height={12}
            width={3}
             />
          ) : (
            contactDetails ? "Update" : "Create"
          )
        }
      </button>
    </form>
  );
}

export default ContactForm
