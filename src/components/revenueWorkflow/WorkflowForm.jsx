import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../theme/theme";

const GOAL_OPTIONS = [
  { value: "more_leads", label: "More Leads — Increase top-of-funnel volume" },
  {
    value: "more_bookings",
    label: "More Bookings — Convert enquiries to booked jobs",
  },
  {
    value: "more_quotes",
    label: "More Quotes — Increase requests and close rate",
  },
  {
    value: "more_repeat_revenue",
    label: "Repeat Revenue — Retain clients and grow LTV",
  },
];

export default function WorkflowForm({ onSubmit, isLoading }) {
  const [mode, setMode] = useState("url");
  const [form, setForm] = useState({
    url: "",
    description: "",
    businessName: "",
    businessType: "",
    revenueGoal: "more_leads",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form });
  };

  const valid =
    mode === "url" ? form.url.trim() !== "" : form.description.trim() !== "";

  return (
    <FormCard>
      <ModeRow>
        <ModeBtn
          $active={mode === "url"}
          type="button"
          onClick={() => setMode("url")}
        >
          Website URL
        </ModeBtn>
        <ModeBtn
          $active={mode === "description"}
          type="button"
          onClick={() => setMode("description")}
        >
          Text Description
        </ModeBtn>
      </ModeRow>

      <form onSubmit={handleSubmit}>
        {mode === "url" ? (
          <Field>
            <Label htmlFor="url">
              Business Website <Required>*</Required>
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://yourbusiness.com"
              autoFocus
            />
          </Field>
        ) : (
          <Field>
            <Label htmlFor="description">
              Describe the Business <Required>*</Required>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. We're a local plumbing company. Customers find us via Google. We quote via phone calls but lose many before they book..."
              rows={4}
            />
          </Field>
        )}

        <TwoCol>
          <Field>
            <Label htmlFor="businessName">
              Business Name <Opt>(optional)</Opt>
            </Label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              value={form.businessName}
              onChange={handleChange}
              placeholder="e.g. Smith Plumbing"
            />
          </Field>
          <Field>
            <Label htmlFor="businessType">
              Industry / Type <Opt>(optional)</Opt>
            </Label>
            <Input
              id="businessType"
              name="businessType"
              type="text"
              value={form.businessType}
              onChange={handleChange}
              placeholder="e.g. Trades, Clinic, Agency"
            />
          </Field>
        </TwoCol>

        <Field>
          <Label htmlFor="revenueGoal">Revenue Goal</Label>
          <Select
            id="revenueGoal"
            name="revenueGoal"
            value={form.revenueGoal}
            onChange={handleChange}
          >
            {GOAL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor="notes">
            Additional Notes <Opt>(optional)</Opt>
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="e.g. Keep it simple. Local leads only. B2B focus."
            rows={2}
          />
        </Field>

        <SubmitBtn type="submit" disabled={!valid || isLoading}>
          {isLoading ? (
            <>
              <Spinner /> Generating Workflow…
            </>
          ) : (
            "Generate Revenue Workflow →"
          )}
        </SubmitBtn>
      </form>
    </FormCard>
  );
}

const FormCard = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`;

const ModeRow = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border.primary};
  padding-bottom: ${theme.spacing.md};
`;

const ModeBtn = styled.button`
  background: ${(p) =>
    p.$active ? "rgba(96, 165, 250, 0.15)" : "transparent"};
  border: 1px solid
    ${(p) => (p.$active ? theme.colors.accent.primary : "transparent")};
  color: ${(p) =>
    p.$active ? theme.colors.accent.primary : theme.colors.text.secondary};
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: ${theme.transitions.fast};
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: 0.5rem;
`;

const Required = styled.span`
  color: ${theme.colors.accent.primary};
  margin-left: 2px;
`;

const Opt = styled.span`
  color: rgba(243, 244, 246, 0.5);
  font-weight: ${theme.typography.fontWeight.normal};
  font-size: ${theme.typography.fontSize.xs};
`;

const sharedInputStyles = `
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(96, 165, 250, 0.15);
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.primary};
  padding: 0.75rem 1rem;
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily};
  transition: ${theme.transitions.fast};
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(243, 244, 246, 0.35);
  }

  &:focus {
    border-color: rgba(96, 165, 250, 0.5);
    background: rgba(0, 0, 0, 0.4);
  }
`;

const Input = styled.input`
  ${sharedInputStyles}
`;

const Textarea = styled.textarea`
  ${sharedInputStyles}
  resize: vertical;
  min-height: 80px;
`;

const Select = styled.select`
  ${sharedInputStyles}
  cursor: pointer;

  option {
    background: #1a1a2e;
    color: ${theme.colors.text.primary};
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  display: inline-block;
  animation: ${spin} 0.7s linear infinite;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${(p) =>
    p.disabled
      ? "rgba(96, 165, 250, 0.2)"
      : "linear-gradient(45deg, #60a5fa, #3b82f6)"};
  color: ${(p) => (p.disabled ? "rgba(243, 244, 246, 0.4)" : "#fff")};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-family: ${theme.typography.fontFamily};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: ${theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: ${theme.spacing.md};

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(96, 165, 250, 0.3);
  }
`;
