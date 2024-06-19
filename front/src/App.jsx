import { Routes, Route } from 'react-router-dom';
import { StateProvider } from "./utils/StateContext";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BeautyInfoPage from './pages/BeautyInfoPage';
import BeautyMyInfo from './components/EditBeautyInfo';
import BeautyMyPage from './pages/BeautyMyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {


  return (
    <>
      <StateProvider>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/beauties/:id' element={<BeautyInfoPage />}/>
          <Route path='/my-beauties' element={<BeautyMyPage />}/>
          <Route path='/beauties/:id' element={<BeautyMyInfo />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StateProvider>
    </>
  )
}

export default App
