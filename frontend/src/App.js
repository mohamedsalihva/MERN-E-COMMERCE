import './App.css';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect } from 'react';
import Context from './context/context';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch()

  
  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()
    
    
    if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
      console.log("userdetails:", dataResponse)
    }



useEffect(()=>{
 
  fetchUserDetails()


},[])
  return (
    <>
    <Context.Provider value={{
        fetchUserDetails,
     
    }}>
      <ToastContainer 
        position='top-center'
      />
      
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </Context.Provider>
  </>

  );
}

export default App;
