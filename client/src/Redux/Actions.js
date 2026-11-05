import { GETALLCONTACTS, GETONECONTACT } from "./ActionsTypes"
import axios from 'axios'
export const getAllContact=()=>async(dispatch)=>{
    try {
        const res = await axios.get('/api/contact/getAllContact')

        dispatch(
            {
                type : GETALLCONTACTS,
                payload : res.data.contacts
            }
        )
    } catch (error) {
        console.log(error)
    }
}


export const addContact=(contactToAdd, navigate)=>async(dispatch)=>{
    try {
        await axios.post('/api/contact/addContact', contactToAdd)

        dispatch(getAllContact())

        navigate('/ContactsList')
    } catch (error) {
        console.log(error)
    }
}

export const getOneContact=(id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/contact/getOneContact/${id}`)

        dispatch(
            {
                type : GETONECONTACT,
                payload : res.data.found
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export const editContact=(id, upContact, navigate)=>async(dispatch)=>{
    try {

        await axios.put(`/api/contact/updateContact/${id}`, upContact)

        dispatch(getAllContact())

        navigate('/ContactsList')
        
    } catch (error) {
        console.log(error)
    }
}


export const deleteContact=(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/contact/deleteContact/${id}`)

        dispatch(getAllContact())
    } catch (error) {
        console.log(error)
    }
}