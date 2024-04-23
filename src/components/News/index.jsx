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
      setLoading(true);
      const params = new URLSearchParams({
        access_key: '6e29167980794ba88c804558f7cf5cda',
        languages: 'en',
        categories: 'technology, business',
      });
      const url = `https://api.mediastack.com/v1/news?${params.toString()}`;

      try {
        const response = await axiosCall({
          method: 'get',
          url,
        });
        const articles = response.data.data;
        const filteredArticles = articles.filter(
          (article) =>
            article.author &&
            article.description &&
            article.title &&
            article.url &&
            article.image &&
            article.published_at
        );
        setNewsData(filteredArticles);
      } catch (error) {
        console.error('Error:', error);
      } finally {
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
            image={article.image}
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
