import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactForm } from '../components/contact-form/contact-form'
import { db } from '../db'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import './contact-edit-page.css'

export const ContactEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const action = async (data) => {
    await setDoc(doc(db, 'contacts', id), data)
    return { id }
  }

  const [contact, setContact] = useState({
    data: null,
    loading: true,
    error: null,
  })

  const docRef = doc(db, 'contacts', id)

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        setContact({
          ...contact,
          loading: false,
          error: `Contact not found with id: ${id}`,
        })
        return
      }

      setContact({
        data: docSnap.data(),
        loading: false,
        error: null,
      })
    }

    getData()
  }, [])

  const deleteDocument = async () => {
    await deleteDoc(doc(db, 'contacts', id))
    navigate('/contacts')
  }

  if (contact.loading) {
    return <div>loading...</div>
  }

  if (contact.error) {
    return <div>error {contact.error}</div>
  }

  const { data } = contact

  return (
    <div>
      <div>
        <Link to="/contacts">&lt; Contacts</Link>
      </div>
      <h1>New Contact</h1>
      <ContactForm action={action} contact={data} submitText="update contact" />
      <div className="edit-delete-section">
        <button onClick={() => deleteDocument()} className="button-danger">
          Delete
        </button>
      </div>
    </div>
  )
}
