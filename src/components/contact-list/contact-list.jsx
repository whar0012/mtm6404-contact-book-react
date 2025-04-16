import { Link } from 'react-router-dom'
import './contact-list.css'

export const ContactList = ({ contacts }) => {
  return <div className='contact-list'>
    {contacts.map(contact => {
      return <Link className="contact-list-item" key={contact.id} to={`/contacts/${contact.id}`}>
        {contact.firstName} {contact.lastName}
      </Link>
    })}
  </div>
}
