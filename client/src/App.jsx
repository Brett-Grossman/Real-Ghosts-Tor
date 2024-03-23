import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterAndLogin from './views/RegisterAndLogin'
import ViewAllProperties from './views/AllProperties'
import NewProperty from './views/NewProperty'
import ViewOneProperty from './views/ViewOneProperty'
import UserProfile from './views/UserProfile'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route path="/new_property/:currentUserId" element={<NewProperty />} />
        <Route path="/all_properties/:currentUserId" element={<ViewAllProperties /> } />
        <Route path="/view_property/:currentUserId/:propertyId" element={<ViewOneProperty />} />
        <Route path="/view_property" element={<ViewOneProperty />} />
        <Route path="/profiles/:currentUserId/:otherUserId" element={<UserProfile />} />
        <Route path="/profiles" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App