import { Outlet } from 'react-router-dom'
import './layout.css'

export const Layout = () => {
  return (
    <div className="layout">
      <div id="content">
        <Outlet />
      </div>
    </div>
  )
}
