import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../db'
import { ContactList } from '../components/contact-list/contact-list'
import './contact-list-page.css'

export const ContactListPage = () => {
  const [contacts, setContacts] = useState({
    data: [],
    loading: true,
  })
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'))
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setContacts({ data, loading: false })
        setData(data)
      } catch (err) {
        console.error('Firestore error:', err)
      }
    }

    getData()
  }, [])

  const onSearch = (value) => {
    setSearch(value)

    if (!value) {
      setData(contacts.data)
      return
    }

    setData(
      contacts.data.filter(
        (x) =>
          x.firstName.toLowerCase().includes(value.toLowerCase()) ||
          x.lastName.toLowerCase().includes(value)
      )
    )
  }

  return (
    <div className="list-page">
      <div className="list-toolbar">
        <Link className="plus-button" to="/contacts/new">+</Link>
      </div>
      <h1>Contacts</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      {contacts.loading && <div>loading...</div>}
      {!contacts.loading && <ContactList contacts={data} />}
    </div>
  )
}
