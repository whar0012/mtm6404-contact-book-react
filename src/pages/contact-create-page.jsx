import { Link } from 'react-router-dom'
import { ContactForm } from '../components/contact-form/contact-form'
import { db } from '../db'
import { addDoc, collection } from 'firebase/firestore'

export const ContactCreatePage = () => {
  const action = async (data) => {
    return addDoc(collection(db, 'contacts'), data)
  }

  return (
    <div>
      <div>
        <Link to="/contacts">&lt; Contacts</Link>
      </div>
      <h1>New Contact</h1>
      <ContactForm action={action} submitText="add contact" />
    </div>
  )
}
