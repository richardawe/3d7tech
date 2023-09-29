import ContactUs from './components/contact us/contactus';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/contactus' element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
