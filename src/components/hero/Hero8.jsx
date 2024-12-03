import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Lightbulb,
  Target,
  Briefcase,
  FileText,
  Mail,
  Clipboard,
  Download,
} from "lucide-react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { createHubSpotPayload } from "../../utils/helpers";
import { toast } from "react-toastify";

const portalId = import.meta.env.VITE_PORTAL_ID;
const formId = import.meta.env.VITE_3D_STRATEGY_FORM_ID;
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const apiKey2 = import.meta.env.VITE_API_KEY;

const BusinessPlanGenerator = () => {
  const [businessPlan, setBusinessPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    businessName: "",
    targetMarket: "",
    industry: "",
  });
  const { email, businessName, targetMarket, industry } = formValues;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const submitToHubSpot = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = {
        fields: createHubSpotPayload(formValues),
      };
      const response = await axios.post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey2}`,
          },
        }
      );
      console.log({ response });
      response.status === 200 &&
        (toast.success(response?.data?.inlineMessage), generateBusinessPlan());
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      setError("Failed to submit form to HubSpot. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const generateBusinessPlan = async () => {
    setIsLoading(true);
    setError("");
    setBusinessPlan("");

    if (!apiKey) {
      setError(
        "OpenAI API key is missing. Please check your environment variables."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a business consultant specialized in creating business plans for small businesses focused on 'Design, Develop and Deliver' services.",
              },
              {
                role: "user",
                content: `Create a brief strategy document for a company named "${businessName}" in the ${industry} industry, targeting ${targetMarket}. 
            Focus on how a 'Design, Develop and Deliver' approach can help. 
            Structure the strategy document with clear sections for Products/Services, Market Analysis, and Marketing Strategy.`,
              },
            ],
            max_tokens: 1000,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message ||
            "An error occurred while generating the business plan."
        );
      }

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const generatedPlan = data.choices[0].message.content;
        setBusinessPlan(generatedPlan);
      }
    } catch (err) {
      setError(`Failed to generate business plan: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(businessPlan);
    alert("Strategy copied!");
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text(`Business Plan for ${businessName}`, 20, 20);

    // Add content
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(businessPlan, 180);
    doc.text(splitText, 15, 40);

    // Save the PDF
    doc.save(`${businessName}_Business_Plan.pdf`);
  };
  return (
    <Container>
      <Title>3D Strategy - Let's help</Title>
      <ContentWrapper onSubmit={submitToHubSpot}>
        <InputGroup>
          <Lightbulb color="#fbbf24" size={24} />
          <Input
            name="businessName"
            type="text"
            placeholder="What is your business name?"
            value={businessName}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Briefcase color="#3b82f6" size={24} />
          <Input
            name="industry"
            type="text"
            placeholder="What industry do you operate in?"
            value={industry}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup>
          <Target color="#ef4444" size={24} />
          <Input
            name="targetMarket"
            type="text"
            placeholder="What is your target market?"
            value={targetMarket}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup>
          <Mail color="#10b981" size={24} />
          <Input
            name="email"
            type="email"
            placeholder="What is your email?"
            value={email}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        <Button
          // onClick={generateBusinessPlan}
          disabled={isLoading || submitting || !email || !businessName}
        >
          {isLoading
            ? "Generating..."
            : submitting
            ? "Submitting..."
            : "Generate"}
        </Button>
        {error && (
          <ErrorMessage>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {error}
          </ErrorMessage>
        )}
        {businessPlan && (
          <PlanContainer>
            <PlanTitle>
              <FileText color="#22c55e" size={24} />
              <h3>Strategy Plan</h3>
            </PlanTitle>
            <FormattedText
              dangerouslySetInnerHTML={{ __html: formatPlanText(businessPlan) }}
            />
            <ButtonGroup>
              <CopyButton onClick={copyToClipboard}>
                <Clipboard color="#fbbf24" size={24} /> Copy
              </CopyButton>
              <DownloadButton onClick={downloadAsPDF}>
                <Download color="#fbbf24" size={24} /> Download PDF
              </DownloadButton>
            </ButtonGroup>
          </PlanContainer>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default BusinessPlanGenerator;

// Utility function to format the plan text
const formatPlanText = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /^(Products\/Services|Market Analysis|Marketing Strategy)/gm,
      "<strong>$1</strong>"
    );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(to bottom right, #ebf8ff, #dcdffe);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 20;
`;

const ContentWrapper = styled.form`
  width: 100%;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #4338ca;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.3s ease-out;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #6366f1;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #4f46e5;
    transform: translateY(-0.25rem);
  }
  &:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
  background-color: #fee2e2;
  padding: 1rem;
  border-radius: 0.75rem;
  width: 100%;
`;

const PlanContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  margin-top: 1.5rem;
  animation: ${fadeIn} 0.3s ease-out;
  width: 100%;
`;

const PlanTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const FormattedText = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  white-space: pre-wrap;
  width: 100%;

  strong {
    display: block;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #4338ca; // A deep blue color for emphasis
  }

  p {
    margin-bottom: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const CopyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #4338ca;
  &:hover {
    background-color: #059669;
  }
`;

const DownloadButton = styled(CopyButton)``;
