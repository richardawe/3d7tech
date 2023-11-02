import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactUs from './components/contact us/contactus';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
