// import React, { useEffect, useState } from 'react';
// import '../../../public/css/style.css';
// import DisplayNews from './DisplayNews';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const News = () => {
//   const [allNewsData, setAllNewsData] = useState([]);
//   const [selectedNews, setSelectedNews] = useState([]);
//   const [filteredNews, setFilteredNews] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [notificationVisible, setNotificationVisible] = useState(false);

//   async function fetchData() {
//     try {
//       const categories = [
//         'general',
//         'business',
//         'entertainment',
//         'health',
//         'science',
//         'sports',
//         'technology',
//       ];

//       const newsData = await Promise.all(
//         categories.map((category) => fetchNews(category))
//       );

//       setAllNewsData(newsData.flat());
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   async function fetchNews(category) {
//     const response = await fetch(
//       `https://api.mediastack.com/v1/news?access_key=6e29167980794ba88c804558f7cf5cda&languages=en&categories=${category}`
//     );
//     const jsonData = await response.json();
//     return jsonData.data.map((article) => ({ ...article, category }));
//   }

//   function filterNews(event) {
//     const { value } = event.currentTarget;
//     const selectedCategory = value;
//     setSelectedCategory(value);
//     const filteredNews = selectedCategory
//       ? allNewsData.filter((article) => article.category === selectedCategory)
//       : allNewsData;
//     setFilteredNews(filteredNews);
//   }
//   function selectAll() {
//     const checkboxes = document.querySelectorAll('.newsCheckbox');
//     const allChecked = [...checkboxes].every((cb) => cb.checked);

//     checkboxes.forEach((cb) => (cb.checked = !allChecked));
//   }

//   function sendEmail() {
//     if (selectedNews.length === 0) {
//       toast.error('Please select news items to email.', {
//         position: 'top-center',
//         autoClose: 2000,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     try {
//       const subject = 'Selected News';
//       const body = selectedNews
//         .map(
//           ({ category, title, url }) =>
//             `${
//               category.charAt(0).toUpperCase() + category.slice(1)
//             }: ${title}\n${url}`
//         )
//         .join('\n\n');

//       const mailtoLink = `mailto:?subject=${encodeURIComponent(
//         subject
//       )}&body=${encodeURIComponent(body)}`;

//       window.open(mailtoLink, '_blank');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('An error occurred while sending the email. Please try again.');
//     }
//   }

//   function generatePost(title) {
//     const prompt = `Generate social media posts for the news: "${title}"`;
//     navigator.clipboard.writeText(prompt);

//     setNotificationVisible(true);
//     setTimeout(() => {
//       setNotificationVisible(false);
//     }, 3000);

//     setTimeout(() => {
//       setNotificationVisible(false);
//     }, 3000);
//   }


//   useEffect(() => {
//     fetchData();
//   }, []);
//   return (
//     <div>
//       <div class='container'>
//         <div class='header'>
//           <h1>3d7 Technologies Updates</h1>
//         </div>
//         <div class='visual-instructions'>
//           <h2>How to use:</h2>
//           <ol>
//             <li>Select a category from the dropdown menu to filter news.</li>
//             <li>
//               Check the boxes next to the news articles you want to include in
//               your email.
//             </li>
//             <li>Click "Select All" to select all news articles at once.</li>
//             <li>
//               Click "Send Email" to compose an email with the selected news
//               articles.
//             </li>
//             <li>
//               Click "Generate Post" next to each news article to create a social
//               media post prompt.
//             </li>
//             <li>
//               Paste the generated prompt into any AI system to generate social
//               media posts.
//             </li>
//           </ol>
//         </div>
//         <div class='filter-container'>
//           <label htmlFor='categoryFilter'>Filter by Category:</label>
//           <select id='categoryFilter' onChange={filterNews}>
//             <option value=''>All Categories</option>
//             <option value='general'>General</option>
//             <option value='business'>Business</option>
//             <option value='entertainment'>Entertainment</option>
//             <option value='health'>Health</option>
//             <option value='science'>Science</option>
//             <option value='sports'>Sports</option>
//             <option value='technology'>Technology</option>
//           </select>
//         </div>
//         <div class='button-container'>
//           <button id='selectAllButton' onClick={selectAll}>
//             Select All
//           </button>
//           <button id='emailButton' onClick={sendEmail}>
//             Send Email
//           </button>
//         </div>
//         <DisplayNews
//           setSelectedNews={setSelectedNews}
//           selectedNews={selectedNews}
//           generatePost={generatePost}
//           notificationVisible={notificationVisible}
//           newsData={selectedCategory ? filteredNews : allNewsData}
//         />
//       </div>
//     </div>
//   );
// };

// export default News;

import React, { useEffect, useState } from 'react';
import '../../../public/css/style.css';
import DisplayNews from './DisplayNews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const newsApiKey= import.meta.env.VITE_NEWS_API_KEY; // Replace with your actual API key

  async function fetchTechNews(limit = 20) {
    const baseUrl = 'https://www.alphavantage.co/query';
    const params = new URLSearchParams({
      function: 'NEWS_SENTIMENT',
      topics: 'technology',
      limit: limit,
      apikey: newsApiKey
    });

    try {
      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();

      if (data.feed) {
        return data.feed.map(article => ({
          title: article.title,
          url: article.url,
          published_at: article.time_published,
          author: article.authors.join(', '),
          description: article.summary,
          image: article.banner_image,
          source: article.source,
          category: 'technology'
        }));
      } else {
        throw new Error('No feed data in the response');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  useEffect(() => {
    fetchTechNews(100).then(setNewsData);
  }, []);

  function selectAll() {
    const checkboxes = document.querySelectorAll('.newsCheckbox');
    const allChecked = [...checkboxes].every((cb) => cb.checked);
    checkboxes.forEach((cb) => (cb.checked = !allChecked));
  }

  function sendEmail() {
    if (selectedNews.length === 0) {
      toast.error('Please select news items to email.', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const subject = 'Selected Technology News';
      const body = selectedNews
        .map(({ title, url }) => `Technology: ${title}\n${url}`)
        .join('\n\n');

      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email. Please try again.');
    }
  }

  function generatePost(title) {
    const prompt = `Generate social media posts for the technology news: "${title}"`;
    navigator.clipboard.writeText(prompt);

    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  }

  return (
    <div>
      <div className='container'>
        <div className='header'>
          <h1>3d7 Technologies Updates</h1>
        </div>
        <div className='visual-instructions'>
          <h2>How to use:</h2>
          <ol>
            <li>Browse the latest technology news articles.</li>
            <li>Check the boxes next to the news articles you want to include in your email.</li>
            <li>Click "Select All" to select all news articles at once.</li>
            <li>Click "Send Email" to compose an email with the selected news articles.</li>
            <li>Click "Generate Post" next to each news article to create a social media post prompt.</li>
            <li>Paste the generated prompt into any AI system to generate social media posts.</li>
          </ol>
        </div>
        <div className='button-container'>
          <button id='selectAllButton' onClick={selectAll}>
            Select All
          </button>
          <button id='emailButton' onClick={sendEmail}>
            Send Email
          </button>
        </div>
        <DisplayNews
          setSelectedNews={setSelectedNews}
          selectedNews={selectedNews}
          generatePost={generatePost}
          notificationVisible={notificationVisible}
          newsData={newsData}
        />
      </div>
    </div>
  );
};

export default News;