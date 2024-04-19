import React, { useEffect, useState } from 'react';
import { axiosCall } from '../../utils/axiosCall';
import NewsCard from './NewsCard';
import styled from 'styled-components';
import Spinner from '../Spinner';

const News = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=ff31efa2450b4488ac2d9d34742837ca';
      try {
        const response = await axiosCall({
          method: 'get',
          url,
        });
        const articles = response.data.articles;
        const filteredArticles = articles.filter(
          (article) =>
            article.author !== null &&
            article.description !== '[Removed]' &&
            article.title !== '[Removed]' &&
            article.url !== 'https://removed.com' &&
            article.urlToImage !== null &&
            article.publishedAt !== '1970-01-01T00:00:00Z'
        );
        setNewsData(filteredArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <NewsContainer>
      {loading ? (
        <Spinner />
      ) : (
        newsData &&
        newsData.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            url={article.url}
            urlToImage={article.urlToImage}
            description={article.description}
          />
        ))
      )}
    </NewsContainer>
  );
};

export default News;

const NewsContainer = styled.div`
  padding: 7rem 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;
