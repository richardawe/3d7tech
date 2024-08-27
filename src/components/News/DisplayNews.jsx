import React from 'react';
import styled from 'styled-components';

const DisplayNews = ({
  newsData,
  setSelectedNews,
  selectedNews,
  generatePost,
  notificationVisible,
}) => {
  const handleCheckboxChange = (event, article) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedNews([...selectedNews, article]);
    } else {
      setSelectedNews(
        selectedNews.filter((item) => item.title !== article.title)
      );
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Social Media Post</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {newsData.map((article, index) => (
            <tr key={`${article.title}-${index}`}>
              <td>
                {article.category.charAt(0).toUpperCase() +
                  article.category.slice(1)}
              </td>
              <td>
                <a href={article.url} target='_blank'>
                  {article.title}
                </a>
              </td>
              <td>{article.description || ''}</td>
              <td>
                {article.image ? (
                  <ImageArticle src={article.image} alt={article.title} />
                ) : (
                  ''
                )}
              </td>
              <td>
                <button
                  className='generate-post-button'
                  onClick={() => generatePost(article.title)}
                >
                  Generate Post
                </button>
              </td>
              <td>
                <input
                  type='checkbox'
                  className='newsCheckbox'
                  value={`${article.category}|${article.title}|${article.url}`}
                  onChange={(event) => handleCheckboxChange(event, article)}
                  checked={selectedNews.some(
                    (item) => item.title === article.title
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {notificationVisible && (
        <div className='notification'>
          Paste prompt on docuhelp.ai to generate social media post
        </div>
      )}
    </div>
  );
};

export default DisplayNews;
const ImageArticle = styled.img`

width:70%;
height:10vh;
object-size:fit-content;
`