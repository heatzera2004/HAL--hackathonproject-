import {BrowserRouter as Router, Route , Routes , Navigate} from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import DashBoard from './pages/admin/dashboard/Dashboard'
import NoPage from './pages/nopage/NoPage'
import MyState from './context/data/myState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/SignUp'
import ProductInfo from './pages/productInfo/ProductInfo'
import Cart from './pages/cart/Cart'
import UpdateProduct from './pages/admin/pages/UpdateProduct'
import AddProduct from './pages/admin/pages/AddProduct'
import { ToastContainer, toast } from 'react-toastify';
import Allproducts from './pages/allproducts/AllProducts'
import Disease from './pages/disease/Disease'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/order' element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path='/cart' element={<Cart />} />
          <Route path='/dashboard' element={
          <ProtectedRouteForAdmin>
              <DashBoard />
          </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path='/productinfo/:id' element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/*' element={<NoPage />} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />  
          <Route path='/disease'element={<Disease />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState> 
  )
}

export default App

//user

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin 

const ProtectedRouteForAdmin = ({children})=> {
  const admin = JSON.parse(localStorage.getItem('user'))
  
  if(admin.user.email === 'test@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}
