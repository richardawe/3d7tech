import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const DisplayNews = ({
  newsData,
  setSelectedNews,
  selectedNews,
  generatePost,
  notificationVisible,
}) => {
  const handleCheckboxChange = (e, article) => {
    if (e.target.checked) {
      setSelectedNews([...selectedNews, article]);
    } else {
      setSelectedNews(selectedNews.filter((item) => item !== article));
    }
  };

  return (
    <NewsGrid>
      {newsData.map((article, index) => (
        <NewsCard key={index}>
          {article.image && (
            <NewsImage src={article.image} alt={article.title} />
          )}
          <NewsContent>
            <NewsHeader>
              <NewsTitle>{article.title}</NewsTitle>
              <NewsCheckbox
                type="checkbox"
                className="newsCheckbox"
                onChange={(e) => handleCheckboxChange(e, article)}
              />
            </NewsHeader>
            <NewsDescription>{article.description}</NewsDescription>
            <NewsFooter>
              <NewsMetadata>
                <NewsSource>{article.source}</NewsSource>
                <NewsDate>
                  {new Date(article.published_at).toLocaleDateString()}
                </NewsDate>
              </NewsMetadata>
              <ButtonGroup>
                <ActionButton
                  as="a"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </ActionButton>
              </ButtonGroup>
            </NewsFooter>
          </NewsContent>
        </NewsCard>
      ))}
    </NewsGrid>
  );
};

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const NewsCard = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: ${theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    background: ${theme.colors.background.surfaceHover};
    border-color: ${theme.colors.border.hover};
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const NewsTitle = styled.h3`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0;
`;

const NewsCheckbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${theme.colors.accent.primary};
`;

const NewsDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.lg};
`;

const NewsFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const NewsMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const NewsSource = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
`;

const NewsDate = styled.span`
  opacity: 0.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  background: ${theme.colors.background.surface};
  color: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.border.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.base};
  text-decoration: none;
  text-align: center;
  flex: 1;

  &:hover {
    background: ${theme.colors.background.surfaceHover};
    border-color: ${theme.colors.border.hover};
    transform: translateY(-2px);
  }
`;

export default DisplayNews;