import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./components/contact us/contactus";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import { ToastContainer } from "react-toastify";
import Text2AI from "./components/text2AI";
import AboutUs from "./pages/AboutUsPage";
import AiQuiz from "./pages/AiQuizPage";
import News from "./pages/NewsPage";
import { clarity } from "react-microsoft-clarity";
/**
 * Renders the main application component with routing.
 * @returns {JSX.Element} JSX for the main application component.
 */

function App() {
  const { VITE_CLARITY_ID } = import.meta.env;
  clarity.init(VITE_CLARITY_ID);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/text2AI" element={<Text2AI />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/news" element={<News />} />
        <Route path="/aiQuiz" element={<AiQuiz />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
