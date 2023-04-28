import React, { useContext, } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import NavBar from './components/navBar/NavBar';
import Announcement from './components/Announcement';
import { observer } from 'mobx-react-lite';
import { Context } from './context/Context';
//import SpinnerCarRot from './components/spinners/SpinnerCarRot';

const App = observer(() => {
  const {user} = useContext<any | null>(Context);
  //const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //   await getCurUser()
    //   if () {

    //   }
    //         user.setUser(true)
    //         user.setIsAuth(true)
    //      //setLoading(false)
    // }, [])
    // if (loading) {
    //     return <SpinnerCarRot/>
    // }

  return (
    <BrowserRouter >
         <Announcement/>
         <NavBar />
         <AppRouter />
         <Footer/>
    </BrowserRouter>
  );
});

export default App;
