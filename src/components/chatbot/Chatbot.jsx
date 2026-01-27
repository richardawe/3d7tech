import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { theme } from "../../theme/theme";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm the 3D7 Technologies assistant. I can help you learn about our company, products, services, and team. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.3d7tech.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant for 3D7 Technologies. You have access to the following information about the company:

COMPANY: 3D7 Technologies specializes in various engineering activities that help businesses achieve their goals. We solve business problems using Artificial Intelligence systems. Our approach is "Design, Develop and Deliver".

SERVICES:
- AI Systems Development: Crafting cutting-edge AI systems tailored to specific business needs
- Project Consultancy: Providing expert project consultancy services
- Web Builder Platforms: Empowering Africa's micro, small, and medium enterprises with web builder platforms

PRODUCTS:
- DocuHelp: Helps write business documents (https://docuhelp.ai/)
- Requstory: User story writing tool (https://requstory.com/)
- JRS: Job recommender system (https://jrs.3d7tech.com/)
- Text2AI: SMS-based AI assistant (/text2AI)
- ngr.ltd: Web builder platform for Nigerian MSMEs (https://ngr.ltd)
- Play 1.0: AI-powered workspace desktop app (/play)

TEAM: Led by Richard Awe (Founder & CEO), Victor Ukam (CTO), and a team of skilled professionals in product management, development, design, and marketing.

CONTACT: Schedule a consultation at https://calendly.com/consult3d7tech/project-consultancy

Answer questions based on this information. Be friendly, concise, and helpful. If asked about something not in the knowledge base, politely say you can only answer questions about 3D7 Technologies.`,
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: userMessage,
            },
          ],
          stream: true,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() === "") continue;

          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              setIsLoading(false);
              return;
            }

            try {
              const json = JSON.parse(data);
              if (json.choices && json.choices[0] && json.choices[0].delta) {
                const content = json.choices[0].delta.content || "";
                if (content) {
                  assistantMessage += content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      role: "assistant",
                      content: assistantMessage,
                    };
                    return newMessages;
                  });
                }
              }
              if (json.choices && json.choices[0] && json.choices[0].finish_reason === "stop") {
                setIsLoading(false);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </ChatButton>

      {isOpen && (
        <ChatContainer>
          <ChatHeader>
            <BotIcon>
              <Bot size={20} />
            </BotIcon>
            <ChatTitle>3D7 Technologies Assistant</ChatTitle>
            <CloseButton onClick={() => setIsOpen(false)}>
              <X size={18} />
            </CloseButton>
          </ChatHeader>

          <MessagesContainer>
            {messages.map((message, index) => (
              <Message key={index} $role={message.role}>
                <MessageIcon>
                  {message.role === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </MessageIcon>
                <MessageContent $role={message.role}>
                  {message.content}
                </MessageContent>
              </Message>
            ))}
            {isLoading && (
              <Message $role="assistant">
                <MessageIcon>
                  <Bot size={16} />
                </MessageIcon>
                <MessageContent $role="assistant">
                  <TypingIndicator>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingIndicator>
                </MessageContent>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <ChatInputContainer onSubmit={handleSend}>
            <ChatInput
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about 3D7 Technologies..."
              disabled={isLoading}
            />
            <SendButton type="submit" disabled={isLoading || !input.trim()}>
              <Send size={18} />
            </SendButton>
          </ChatInputContainer>
        </ChatContainer>
      )}
    </>
  );
};

export default Chatbot;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  color: #F3F4F6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(96, 165, 250, 0.4);
  z-index: 999;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(96, 165, 250, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 56px;
    height: 56px;
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 90px;
  right: 2rem;
  width: 400px;
  height: 600px;
  background: linear-gradient(to bottom, #0A0A0A, #1E3A8A);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  z-index: 998;
  animation: ${slideUp} 0.3s ease-out;
  overflow: hidden;

  @media (max-width: 768px) {
    width: calc(100vw - 2rem);
    height: calc(100vh - 120px);
    bottom: 80px;
    right: 1rem;
    left: 1rem;
  }
`;

const ChatHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(96, 165, 250, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
`;

const BotIcon = styled.div`
  color: #60A5FA;
  display: flex;
  align-items: center;
`;

const ChatTitle = styled.h3`
  flex: 1;
  color: #F3F4F6;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #F3F4F6;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(96, 165, 250, 0.3);
    border-radius: 3px;

    &:hover {
      background: rgba(96, 165, 250, 0.5);
    }
  }
`;

const Message = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  animation: ${fadeIn} 0.3s ease-out;
  flex-direction: ${(props) => (props.$role === "user" ? "row-reverse" : "row")};
`;

const MessageIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(props) =>
    props.$role === "user"
      ? "rgba(96, 165, 250, 0.2)"
      : "rgba(96, 165, 250, 0.1)"};
  color: #60A5FA;
`;

const MessageContent = styled.div`
  max-width: 75%;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  background: ${(props) =>
    props.$role === "user"
      ? "linear-gradient(45deg, #60A5FA, #3B82F6)"
      : "rgba(255, 255, 255, 0.05)"};
  color: #F3F4F6;
  font-size: 0.9375rem;
  line-height: 1.5;
  word-wrap: break-word;
  border: ${(props) =>
    props.$role === "assistant"
      ? "1px solid rgba(96, 165, 250, 0.1)"
      : "none"};
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #60A5FA;
    animation: typing 1.4s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.7;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

const ChatInputContainer = styled.form`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(96, 165, 250, 0.1);
  display: flex;
  gap: 0.75rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 12px;
  color: #F3F4F6;
  font-size: 0.9375rem;
  font-family: ${theme.typography.fontFamily};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(243, 244, 246, 0.5);
  }

  &:focus {
    border-color: rgba(96, 165, 250, 0.4);
    background: rgba(255, 255, 255, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  border: none;
  border-radius: 12px;
  color: #F3F4F6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

