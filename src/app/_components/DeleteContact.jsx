import axios from 'axios'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'
import useSWRMutation from "swr/mutation";
import ClipLoader  from "react-spinners/ClipLoader" 
import { useSWRConfig } from "swr"

const deleteContact = async (url) => {
  const res = await axios.delete(url)
  if(res.data.status) {
    return res.data.data
  } else {
    const errorData = res.data
    const error = new Error(errorData.data)
    error.message = errorData.data
    error.statusCode = errorData.statusCode
    error.status = errorData.status
    throw error
  }
}

const DeleteContact = ({ id }) => {
  const { mutate } = useSWRConfig()
  const { trigger, isMutating, error } = useSWRMutation(`/api/contacts/${id}`, deleteContact, {
      onSuccess: (data) => {
        Swal.fire({
          position: "center",
          title: "Deleted!",
          text: `${data.name || "Contact"} has been deleted successfully!`,
          showConfirmButton: false,
          icon: "success",
          timer: 1500
        });
        mutate("/api/contacts")
      }, 
      onError: (error) => {
        Swal.fire({
          position: "center",
          title: "Error!",
          text: error.message,
          showConfirmButton: false,
          icon: "error",
          timer: 2000
        });
      }
  })

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        trigger()
      }
    });
  }
  return (
    <button className="cursor-pointer " onClick={handleDelete}>
        {
          isMutating ? 
          <ClipLoader size={17} color='red' /> 
          : 
          <MdDelete className="text-red-500 text-xl" />
        }
    </button>
  )
}

export default DeleteContact
