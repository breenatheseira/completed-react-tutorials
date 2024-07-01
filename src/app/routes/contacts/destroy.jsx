import { redirect } from 'react-router-dom'
import { deleteContact } from '../../../features/contacts/contacts'

export async function action({params}){
  await deleteContact(params.contactId)
  redirect('/')
}