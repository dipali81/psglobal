import { Outlet } from 'react-router-dom'
// import Header from './Header'
// import Sidebar from './Sidebar'

const SharedComponent = () => {
  return (
  <>
  
{/* <Sidebar/>
<Header/> */}
<Outlet/>

  </>
  )
}

export default SharedComponent