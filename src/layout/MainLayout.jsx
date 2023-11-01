import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className='sect sect_padding_top'>
        <div className='container'>
          <div className='col-md-12'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
