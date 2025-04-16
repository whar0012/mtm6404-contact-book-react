import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { ContactListPage } from './pages/contact-list-page'
import { ContactCreatePage } from './pages/contact-create-page'
import { ContactDetailPage } from './pages/contact-detail-page'
import { ContactEditPage } from './pages/contact-edit-page'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ContactListPage />,
        },
        {
          path: '/contacts',
          element: <ContactListPage />,
        },
        {
          path: '/contacts/new',
          element: <ContactCreatePage />,
        },
        {
          path: 'contacts/:id',
          element: <ContactDetailPage />,
        },
        {
          path: '/contacts/:id/edit',
          element: <ContactEditPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_NAME || '/',
  }
)
