import { doc, getDoc } from 'firebase/firestore'
import { useParams, Link } from 'react-router-dom'
import { db } from '../db'
import { useEffect, useState } from 'react'
import './contact-detail-page.css'

export const ContactDetailPage = () => {
  const { id } = useParams()
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

  if (contact.loading) {
    return <div>loading...</div>
  }

  if (contact.error) {
    return <div>error {contact.error}</div>
  }

  const { data } = contact

  return (
    <div>
      <div className="detail-toolbar">
        <Link to="/contacts">&lt; Contacts</Link>
        <Link to={`/contacts/${id}/edit`}>Edit</Link>
      </div>
      <h1>
        {data.firstName} {data.lastName}
      </h1>
      <hr />
      <div>
        <div>email</div>
        <div>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </div>
      </div>
      <hr />
      <div>
        <div>Phone</div>
        <div>{data.phone}</div>
      </div>
      <hr />
      <div>
        <div>Address</div>
        <div>{data.street}</div>
        <div>
          {data.city} {data.province} {data.postalCode}
        </div>
      </div>
    </div>
  )
}
