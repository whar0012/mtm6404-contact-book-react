import { useForm } from '../../hooks/use-form'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './contact-form.css'

export const ContactForm = ({ action, contact, submitText }) => {
  const { state, setState } = useForm(contact)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const docRef = await action(state)
    setLoading(false)

    navigate(`/contacts/${docRef.id}`)
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <input
          name="firstName"
          placeholder="John"
          type="text"
          value={state.firstName}
          onChange={setState('firstName')}
          required
        />
        <input
          name="lastName"
          placeholder="Doe"
          type="text"
          value={state.lastName}
          onChange={setState('lastName')}
          required
        />
      </div>
      <div className="form-row">
        <input
          name="email"
          placeholder="john.doe@example.com"
          type="email"
          value={state.email}
          onChange={setState('email')}
          required
        />
        <input
          name="phone"
          placeholder="+12986888123"
          type="text"
          value={state.phone}
          onChange={setState('phone')} 
        />
      </div>
      <div className="form-row">
        <input
          name="street"
          placeholder="Savoy Place"
          type="text"
          value={state.street}
          onChange={setState('street')}
        />
      </div>
      <div className="form-row">
        <input
          name="city"
          placeholder="Ottawa"
          type="text"
          value={state.city}
          onChange={setState('city')}
        />
        <input
          name="province"
          placeholder="Ontario"
          type="text"
          value={state.province}
          onChange={setState('province')}
        />
        <input
          name="postal"
          placeholder="K2C0W1"
          type="text"
          value={state.postalCode}
          onChange={setState('postalCode')}
        />
      </div>
      <div className="form-row">
        <button disabled={loading} type="submit" className="button-primary">
          {submitText}
        </button>
        <Link to="/contacts" disabled={loading} className="button-secondary">
          cancel
        </Link>
      </div>
    </form>
  )
}
