import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DisplayNews from './DisplayNews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '../../theme/theme';

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
    <Container>
      <ContentWrapper>
        <Header>
          <Title>3d7 Technologies Updates</Title>
        </Header>
        <InstructionsCard>
          <SubTitle>How to use:</SubTitle>
          <InstructionsList>
            <li>Browse the latest technology news articles.</li>
            <li>Check the boxes next to the news articles you want to include in your email.</li>
            <li>Click "Select All" to select all news articles at once.</li>
            <li>Click "Send Email" to compose an email with the selected news articles.</li>
            <li>Click "Generate Post" next to each news article to create a social media post prompt.</li>
            <li>Paste the generated prompt into any AI system to generate social media posts.</li>
          </InstructionsList>
        </InstructionsCard>
        <ButtonGroup>
          <ActionButton onClick={selectAll}>
            Select All
          </ActionButton>
          <ActionButton onClick={sendEmail}>
            Send Email
          </ActionButton>
        </ButtonGroup>
        <DisplayNews
          setSelectedNews={setSelectedNews}
          selectedNews={selectedNews}
          generatePost={generatePost}
          notificationVisible={notificationVisible}
          newsData={newsData}
        />
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.gradients.background};
  padding: ${theme.spacing['4xl']} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.colors.border.primary}, transparent);
  }
`;

const ContentWrapper = styled.div`
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const Title = styled.h1`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
  ${theme.mixins.textGradient}
`;

const SubTitle = styled.h2`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
`;

const InstructionsCard = styled.div`
  ${theme.mixins.glassmorphism}
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const InstructionsList = styled.ol`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
  line-height: ${theme.typography.lineHeight.relaxed};
  padding-left: ${theme.spacing.xl};
  
  li {
    margin-bottom: ${theme.spacing.md};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  background: ${theme.colors.background.surface};
  color: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.border.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.base};

  &:hover {
    background: ${theme.colors.background.surfaceHover};
    border-color: ${theme.colors.border.hover};
    transform: translateY(-2px);
  }
`;

export default News;