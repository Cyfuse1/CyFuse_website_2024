import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTopButton from './components/ScrollToTopButton'

function WebLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default WebLayout;