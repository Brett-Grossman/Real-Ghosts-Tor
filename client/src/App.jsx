import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterAndLogin from './views/RegisterAndLogin'
import ViewAllProperties from './views/AllProperties'
import NewProperty from './views/NewProperty'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route path="/new_property/:currentUserId" element={<NewProperty />} />
        <Route path="/all_properties/:currentUserId" element={<ViewAllProperties /> } />
        {/* <Route pasth="/view_property/:currentUserId/:propertyId" element={<ViewOneProperty />} />
        <Route path="/view_property" element={<ViewOneProperty />} /> */}
        {/* /profiles/:currentUserId/:otherUserId */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
