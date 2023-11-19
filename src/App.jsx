import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactUs from './components/contact us/contactus';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}
export default App;
