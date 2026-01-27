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
  Sparkles,
  X,
  Zap,
  Loader2,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { theme } from "../../theme/theme";

const BusinessPlanGenerator = () => {
  const [businessPlan, setBusinessPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    generateBusinessPlan();
  };

  const saveStrategyData = async (strategyText) => {
    if (!email || !strategyText) return;

    try {
      const response = await fetch("https://api.3d7tech.com/v1/save-strategy.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          businessName: businessName,
          industry: industry,
          targetMarket: targetMarket,
          strategy: strategyText,
        }),
      });

      if (response.ok) {
        // Also save to localStorage as backup
        const savedData = {
          email,
          businessName,
          industry,
          targetMarket,
          strategy: strategyText,
          timestamp: new Date().toISOString(),
        };
        
        // Get existing saved strategies
        const existing = JSON.parse(localStorage.getItem("savedStrategies") || "[]");
        existing.push(savedData);
        
        // Keep only last 10 strategies in localStorage
        const recent = existing.slice(-10);
        localStorage.setItem("savedStrategies", JSON.stringify(recent));
        
        console.log("Strategy data saved successfully");
      } else {
        console.warn("Failed to save strategy data to server");
        // Still save to localStorage as backup
        const savedData = {
          email,
          businessName,
          industry,
          targetMarket,
          strategy: strategyText,
          timestamp: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem("savedStrategies") || "[]");
        existing.push(savedData);
        const recent = existing.slice(-10);
        localStorage.setItem("savedStrategies", JSON.stringify(recent));
      }
    } catch (error) {
      console.error("Error saving strategy data:", error);
      // Save to localStorage as backup even if server save fails
      const savedData = {
        email,
        businessName,
        industry,
        targetMarket,
        strategy: strategyText,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("savedStrategies") || "[]");
      existing.push(savedData);
      const recent = existing.slice(-10);
      localStorage.setItem("savedStrategies", JSON.stringify(recent));
    }
  };

  const generateBusinessPlan = async () => {
    setIsLoading(true);
    setError("");
    setBusinessPlan("");

    try {
      const response = await fetch(
        "https://api.3d7tech.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
            stream: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message ||
            "An error occurred while generating the business plan."
        );
      }

      // Check if response is streaming
      const contentType = response.headers.get("content-type") || "";
      const isStreaming = contentType.includes("text/event-stream");

      if (isStreaming && response.body) {
        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";
        let resultModalOpened = false;

        // Open modal immediately when streaming starts
        setShowFormModal(false);
        setShowResultModal(true);
        resultModalOpened = true;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              setIsLoading(false);
              // Save email and strategy data after generation completes
              await saveStrategyData(fullText);
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.trim() === "") continue;

              // Handle SSE format
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") {
                  setIsLoading(false);
                  // Save email and strategy data
                  await saveStrategyData(fullText);
                  return;
                }

                try {
                  const json = JSON.parse(data);
                  
                  // Handle streaming chunk
                  if (json.choices && json.choices[0] && json.choices[0].delta) {
                    const content = json.choices[0].delta.content || "";
                    if (content) {
                      fullText += content;
                      // Update immediately for word-by-word effect
                      setBusinessPlan(fullText);
                    }
                  }
                  
                  // Handle final chunk
                  if (json.choices && json.choices[0] && json.choices[0].finish_reason === "stop") {
                    // Ensure final text is displayed
                    setBusinessPlan(fullText);
                    setIsLoading(false);
                    // Save email and strategy data
                    await saveStrategyData(fullText);
                  }
                } catch (e) {
                  // Skip invalid JSON
                  console.warn("Failed to parse SSE data:", e, data);
                }
              }
            }
          }
          
          // Final update to ensure all text is displayed
          setBusinessPlan(fullText);
          setIsLoading(false);
          // Save email and strategy data
          await saveStrategyData(fullText);
        } catch (streamError) {
          console.error("Streaming error:", streamError);
          // If streaming fails, try to get any accumulated text
          if (fullText) {
            setBusinessPlan(fullText);
            setShowFormModal(false);
            setShowResultModal(true);
            setIsLoading(false);
            // Save email and strategy data
            await saveStrategyData(fullText);
          } else {
            throw streamError;
          }
        }
      } else {
        // Fallback to non-streaming
        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
          const generatedPlan = data.choices[0].message.content;
          setBusinessPlan(generatedPlan);
          setIsLoading(false);
          setShowFormModal(false);
          setShowResultModal(true);
        } else {
          throw new Error("Invalid response format from API");
        }
        
        // Save email and strategy data after non-streaming response
        if (data.choices && data.choices[0] && data.choices[0].message) {
          await saveStrategyData(data.choices[0].message.content);
        }
      }
    } catch (err) {
      setError(`Failed to generate business plan: ${err.message}`);
      console.error("Error generating business plan:", err);
      setIsLoading(false);
    }
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setError("");
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setBusinessPlan("");
    // Reset form
    setFormValues({
      email: "",
      businessName: "",
      targetMarket: "",
      industry: "",
    });
  };

  const copyToClipboard = async () => {
    try {
      // Get the formatted HTML from the modal
      const formattedText = formatPlanText(businessPlan);
      
      // Create a temporary element to extract formatted text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = formattedText;
      
      // Convert HTML to formatted plain text while preserving structure
      let formattedPlainText = `Business Strategy Plan for ${businessName}\n`;
      if (email) {
        formattedPlainText += `Generated for: ${email}\n`;
      }
      if (industry) {
        formattedPlainText += `Industry: ${industry}\n`;
      }
      if (targetMarket) {
        formattedPlainText += `Target Market: ${targetMarket}\n`;
      }
      formattedPlainText += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
      
      const processNode = (node, indent = '') => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName.toLowerCase();
          let text = '';
          
          if (tagName === 'h3') {
            text = '\n\n' + node.textContent.trim() + '\n' + '='.repeat(node.textContent.trim().length) + '\n';
          } else if (tagName === 'h4') {
            text = '\n' + node.textContent.trim() + '\n' + '-'.repeat(node.textContent.trim().length) + '\n';
          } else if (tagName === 'p') {
            text = node.textContent.trim() + '\n';
          } else if (tagName === 'li') {
            const isNested = node.classList.contains('nested');
            const bullet = isNested ? '  ◦ ' : '• ';
            text = indent + bullet + node.textContent.trim() + '\n';
          } else if (tagName === 'ul') {
            const isNested = node.classList.contains('nested-list');
            const childIndent = isNested ? '    ' : '';
            Array.from(node.childNodes).forEach(child => {
              text += processNode(child, childIndent);
            });
            return text;
          } else if (tagName === 'strong') {
            text = node.textContent.trim().toUpperCase() + ' ';
          } else {
            Array.from(node.childNodes).forEach(child => {
              text += processNode(child, indent);
            });
            return text;
          }
          
          // Process children
          Array.from(node.childNodes).forEach(child => {
            text += processNode(child, indent);
          });
          
          return text;
        }
        
        return '';
      };
      
      formattedPlainText += processNode(tempDiv);
      
      // Copy both HTML and plain text formats
      const htmlData = new ClipboardItem({
        'text/html': new Blob([formattedText], { type: 'text/html' }),
        'text/plain': new Blob([formattedPlainText], { type: 'text/plain' })
      });
      
      await navigator.clipboard.write([htmlData]);
      
      // Fallback to plain text if ClipboardItem is not supported
      if (!navigator.clipboard.write) {
        await navigator.clipboard.writeText(formattedPlainText);
      }
      
      alert("Strategy copied with formatting!");
    } catch (err) {
      // Fallback to simple text copy
      navigator.clipboard.writeText(businessPlan);
      alert("Strategy copied!");
    }
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const formattedText = formatPlanText(businessPlan);
    
    // Create a temporary element to parse the formatted HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formattedText;
    
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - (margin * 2);
    const lineHeight = 7;
    const sectionSpacing = 10;
    
    // Add title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(`Business Strategy Plan for ${businessName}`, margin, yPosition);
    yPosition += 10;
    
    // Add email and metadata
    if (email) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated for: ${email}`, margin, yPosition);
      yPosition += 5;
      if (industry) {
        doc.text(`Industry: ${industry}`, margin, yPosition);
        yPosition += 5;
      }
      if (targetMarket) {
        doc.text(`Target Market: ${targetMarket}`, margin, yPosition);
        yPosition += 5;
      }
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 10;
      doc.setTextColor(0, 0, 0); // Reset to black
    }
    
    // Helper function to add text with word wrap
    const addText = (text, fontSize = 12, isBold = false, indent = 0) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      const splitText = doc.splitTextToSize(text, maxWidth - indent);
      
      splitText.forEach((line) => {
        if (yPosition > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
    };
    
    // Process the formatted HTML
    const processElement = (element) => {
      const tagName = element.tagName?.toLowerCase();
      
      if (tagName === 'h3') {
        yPosition += sectionSpacing;
        addText(element.textContent.trim(), 16, true);
        yPosition += 5;
      } else if (tagName === 'h4') {
        yPosition += 5;
        addText(element.textContent.trim(), 14, true);
        yPosition += 3;
      } else if (tagName === 'p') {
        addText(element.textContent.trim(), 11, false);
        yPosition += 3;
      } else if (tagName === 'ul') {
        yPosition += 3;
        Array.from(element.children).forEach((li) => {
          const isNested = li.classList.contains('nested');
          const bullet = isNested ? '  ◦ ' : '• ';
          const indent = isNested ? 10 : 5;
          addText(bullet + li.textContent.trim(), 11, false, indent);
        });
        yPosition += 3;
      } else if (tagName === 'li') {
        // Handled in ul
      } else if (tagName === 'strong') {
        addText(element.textContent.trim().toUpperCase(), 12, true);
      } else {
        // Process children recursively
        Array.from(element.children || []).forEach((child) => {
          processElement(child);
        });
        
        // Also process text nodes
        if (element.childNodes) {
          Array.from(element.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              addText(node.textContent.trim(), 11, false);
            }
          });
        }
      }
    };
    
    // Process all top-level elements
    Array.from(tempDiv.children).forEach((child) => {
      processElement(child);
    });
    
    // If no children, process as plain text
    if (tempDiv.children.length === 0) {
      addText(businessPlan, 11, false);
    }
    
    // Save the PDF
    doc.save(`${businessName}_Business_Plan.pdf`);
  };

  return (
    <>
      {/* Floating Box Button */}
      <FloatingBox onClick={() => setShowFormModal(true)}>
        <BoxIcon>
          <Zap size={20} />
        </BoxIcon>
        <BoxLabel>Generate Business Strategy</BoxLabel>
      </FloatingBox>

      {/* Form Modal */}
      {showFormModal && (
        <ModalOverlay onClick={closeFormModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <PlanTitle>
                <FileText size={24} />
                <h3>Generate Business Strategy</h3>
              </PlanTitle>
              <CloseButton onClick={closeFormModal} aria-label="Close modal">
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormContainer onSubmit={handleSubmit}>
                <InputGroup>
                  <IconWrapper>
                    <Lightbulb size={20} />
                  </IconWrapper>
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
                  <IconWrapper>
                    <Briefcase size={20} />
                  </IconWrapper>
                  <Input
                    name="industry"
                    type="text"
                    placeholder="What industry do you operate in?"
                    value={industry}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <IconWrapper>
                    <Target size={20} />
                  </IconWrapper>
                  <Input
                    name="targetMarket"
                    type="text"
                    placeholder="What is your target market?"
                    value={targetMarket}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <IconWrapper>
                    <Mail size={20} />
                  </IconWrapper>
                  <Input
                    name="email"
                    type="email"
                    placeholder="What is your email?"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <Button type="submit" disabled={isLoading || !email || !businessName}>
                  {isLoading ? (
                    <>
                      <Sparkles size={18} />
                      Generating...
                    </>
                  ) : (
                    "Generate Strategy"
                  )}
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
              </FormContainer>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Result Modal */}
      {showResultModal && businessPlan && (
        <ModalOverlay onClick={closeResultModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <PlanTitle>
                <FileText size={24} />
                <h3>Strategy Plan</h3>
                {isLoading && (
                  <LoadingSpinner>
                    <Loader2 size={18} />
                    <span>Generating...</span>
                  </LoadingSpinner>
                )}
              </PlanTitle>
              <CloseButton onClick={closeResultModal} aria-label="Close modal">
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormattedText
                dangerouslySetInnerHTML={{ __html: formatPlanText(businessPlan) }}
              />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <CopyButton onClick={copyToClipboard} type="button">
                  <Clipboard size={18} /> Copy
                </CopyButton>
                <DownloadButton onClick={downloadAsPDF} type="button">
                  <Download size={18} /> Download PDF
                </DownloadButton>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default BusinessPlanGenerator;

// Utility function to format the plan text
const formatPlanText = (text) => {
  if (!text) return "";
  
  let formatted = text;
  
  // Convert markdown bold to HTML
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
  // Split into lines for processing
  const lines = formatted.split('\n');
  const processedLines = [];
  let inList = false;
  let inNestedList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
        inNestedList = false;
      }
      continue;
    }
    
    // Check for main section headers
    if (/^(Executive Summary|Products\/Services|Market Analysis|Marketing Strategy|Design, Develop, and Deliver Approach|Conclusion|Summary):/i.test(line)) {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
        inNestedList = false;
      }
      processedLines.push(`<h3>${line.replace(/:/g, '')}</h3>`);
      continue;
    }
    
    // Check for Roman numeral sections (I., II., III., etc.)
    if (/^[IVX]+\.\s+[A-Z]/.test(line)) {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
        inNestedList = false;
      }
      processedLines.push(`<h4>${line}</h4>`);
      continue;
    }
    
    // Check for numbered sections (1., 2., etc.)
    if (/^\d+\.\s+[A-Z]/.test(line)) {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
        inNestedList = false;
      }
      processedLines.push(`<h4>${line}</h4>`);
      continue;
    }
    
    // Check for nested bullet points (with + or tabs)
    if (/^[\+\t]\s+/.test(line)) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      if (!inNestedList) {
        processedLines.push('<ul class="nested-list">');
        inNestedList = true;
      }
      const content = line.replace(/^[\+\t]\s+/, '');
      processedLines.push(`<li class="nested">${content}</li>`);
      continue;
    }
    
    // Check for main bullet points (* or -)
    if (/^[\*\-\•]\s+/.test(line)) {
      if (inNestedList) {
        processedLines.push('</ul>');
        inNestedList = false;
      }
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      const content = line.replace(/^[\*\-\•]\s+/, '');
      processedLines.push(`<li>${content}</li>`);
      continue;
    }
    
    // Regular paragraph
    if (inList) {
      processedLines.push('</ul>');
      inList = false;
      inNestedList = false;
    }
    
    // Don't add empty paragraphs
    if (line.length > 0) {
      processedLines.push(`<p>${line}</p>`);
    }
  }
  
  // Close any open lists
  if (inNestedList) {
    processedLines.push('</ul>');
  }
  if (inList) {
    processedLines.push('</ul>');
  }
  
  return processedLines.join('\n');
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

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FloatingBox = styled.div`
  position: static;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(96, 165, 250, 0.3);
  transition: all 0.3s ease;
  margin: 0;
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(96, 165, 250, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
  }
`;

const BoxIcon = styled.div`
  color: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxLabel = styled.span`
  color: #F3F4F6;
  font-size: 1rem;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.9375rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled.div`
  background: linear-gradient(to bottom, #0A0A0A, #1E3A8A);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 24px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: ${slideUp} 0.3s ease-out;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.5rem;
  border-bottom: 1px solid rgba(96, 165, 250, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  color: #60A5FA;
  font-size: 0.875rem;
  font-weight: 500;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const PlanTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #F3F4F6;

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    color: #F3F4F6;
    background: linear-gradient(45deg, #60A5FA, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  svg {
    color: #60A5FA;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 12px;
  padding: 0.5rem;
  color: #F3F4F6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(96, 165, 250, 0.4);
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: 2rem 2.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 200px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(96, 165, 250, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(96, 165, 250, 0.5);
    }
  }
`;

const ModalFooter = styled.div`
  padding: 2rem 2.5rem;
  border-top: 1px solid rgba(96, 165, 250, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.1);
  padding: 1.25rem;
  border-radius: 16px;
  animation: ${fadeIn} 0.3s ease-out;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(96, 165, 250, 0.2);
  }

  &:focus-within {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(96, 165, 250, 0.3);
  }
`;

const IconWrapper = styled.div`
  color: #60A5FA;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  color: #F3F4F6;
  font-family: ${theme.typography.fontFamily};

  &::placeholder {
    color: rgba(243, 244, 246, 0.5);
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  color: #F3F4F6;
  border: none;
  border-radius: 16px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(96, 165, 250, 0.3);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: ${theme.typography.fontFamily};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(96, 165, 250, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #FCA5A5;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 1rem;
  border-radius: 16px;
  width: 100%;
  font-size: 0.95rem;
`;

const FormattedText = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  width: 100%;
  color: #F3F4F6;
  font-family: ${theme.typography.fontFamily};

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #60A5FA;
    background: linear-gradient(45deg, #60A5FA, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(96, 165, 250, 0.2);
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #60A5FA;
  }

  p {
    margin-bottom: 1rem;
    color: rgba(243, 244, 246, 0.9);
    line-height: 1.8;
  }

  ul {
    list-style: none;
    margin: 1rem 0;
    padding-left: 0;
  }

  li {
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
    color: rgba(243, 244, 246, 0.9);
    line-height: 1.7;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #60A5FA;
      font-weight: bold;
      font-size: 1.25rem;
    }

    &.nested {
      padding-left: 2.5rem;
      margin-left: 1rem;
      font-size: 1rem;
      color: rgba(243, 244, 246, 0.8);

      &::before {
        content: "◦";
        font-size: 1rem;
      }
    }
  }

  ul.nested-list {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }

  strong {
    font-weight: 700;
    color: #60A5FA;
  }

  /* Ensure proper spacing between elements */
  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CopyButton = styled(Button)`
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.3);
  color: #60A5FA;
  box-shadow: none;

  &:hover:not(:disabled) {
    background: rgba(96, 165, 250, 0.2);
    border-color: rgba(96, 165, 250, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(96, 165, 250, 0.2);
  }
`;

const DownloadButton = styled(CopyButton)``;
