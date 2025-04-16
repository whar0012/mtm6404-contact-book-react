import { useState } from 'react'

const EMPTY_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  province: '',
  postalCode: '',
}

export const useForm = (contact = {}) => {
  const [state, setState] = useState({
    ...EMPTY_STATE,
    ...contact,
  })

  const updateForm = (key) => (e) => {
    setState({
      ...state,
      [key]: e.target.value,
    })
  }

  return { state, setState: updateForm }
}
