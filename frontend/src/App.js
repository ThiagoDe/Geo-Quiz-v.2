import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import RoundsList from './features/rounds/roundsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditRound from './features/rounds/EditRound'
import NewRound from './features/rounds/NewRound'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<Prefetch/>}>
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser/>}/>
              <Route path="new" element={<NewUserForm/>}/>
            </Route>

            <Route path="rounds">
              <Route index element={<RoundsList />} />
              <Route path=":id" element={<EditRound/>}/>
              <Route path="new" element={<NewRound/>}/>
            </Route>


          </Route>{/* End Dash */}
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
