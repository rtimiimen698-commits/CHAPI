import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllContact } from '../Redux/Actions'
import ContactCard from './ContactCard'

const ContactsList = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllContact())
  },[])

  const contacts = useSelector(state=> state.contacts)

  return (
    <div>
      {
        contacts.map((el,i,t)=> <ContactCard el={el} />)
      }
    </div>
  )
}

export default ContactsList