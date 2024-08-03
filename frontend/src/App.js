import './App.css';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context/context';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';



function App() {
  const dispatch = useDispatch()
  const [cartcount, setCartcount] = useState(0)


  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()


    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
    console.log("userdetails:", dataResponse)
  }


  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.countcart.url, {
        method: SummaryApi.countcart.method,
        credentials: 'include'
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        setCartcount(dataApi.data?.count || 0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {

    fetchUserDetails()
    fetchUserAddToCart()

  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartcount,
        fetchUserAddToCart,
      
      }}>
        <ToastContainer
          position='top-center'
        />

        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </Context.Provider>
    </>

  );
}

export default App;
