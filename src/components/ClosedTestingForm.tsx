"use client";

import { useActionState, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, ExternalLink, Send, Users } from "lucide-react";

import { requestClosedTestingAccess } from "@/app/actions";

const initialState = {
  status: "idle" as const,
  message: "",
};

const submittedEmailsKey = "lets-love-closed-testing-emails";

type ClosedTestingFormProps = {
  className?: string;
  googleGroupJoinUrl?: string;
  googlePlayTestingUrl?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="closed-testing-button" type="submit" disabled={pending}>
      <Send className="size-4 shrink-0" />
      {pending ? "Sending" : "Request access"}
    </button>
  );
}

export function ClosedTestingForm({
  className = "",
  googleGroupJoinUrl = "",
  googlePlayTestingUrl = "",
}: ClosedTestingFormProps) {
  const firstNameInputId = useId();
  const emailInputId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const lastSubmittedEmailRef = useRef("");
  const [duplicateEmail, setDuplicateEmail] = useState("");
  const [state, formAction] = useActionState(requestClosedTestingAccess, initialState);
  const hasTestingLinks = Boolean(googleGroupJoinUrl || googlePlayTestingUrl);
  const showNextSteps = (state.status === "success" || Boolean(duplicateEmail)) && hasTestingLinks;

  useEffect(() => {
    if (state.status === "success") {
      const submittedEmail = lastSubmittedEmailRef.current;

      if (submittedEmail) {
        const existingEmails = getStoredSubmittedEmails();
        if (!existingEmails.includes(submittedEmail)) {
          localStorage.setItem(submittedEmailsKey, JSON.stringify([...existingEmails, submittedEmail]));
        }
      }

      formRef.current?.reset();
    }
  }, [state.status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim().toLowerCase();

    if (email && getStoredSubmittedEmails().includes(email)) {
      event.preventDefault();
      setDuplicateEmail(email);
      formRef.current?.reset();
      return;
    }

    lastSubmittedEmailRef.current = email;
    setDuplicateEmail("");
  };

  return (
    <div className={`closed-testing-wrap ${className}`}>
      <form ref={formRef} action={formAction} className="closed-testing-form" onSubmit={handleSubmit}>
        <label htmlFor={firstNameInputId} className="sr-only">
          First name for closed testing
        </label>
        <input
          id={firstNameInputId}
          className="closed-testing-input is-name"
          type="text"
          name="firstName"
          autoComplete="given-name"
          placeholder="First name"
          required
        />
        <label htmlFor={emailInputId} className="sr-only">
          Email address for closed testing
        </label>
        <input
          id={emailInputId}
          className="closed-testing-input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email address"
          required
        />
        <SubmitButton />
      </form>
      {!duplicateEmail && state.message ? (
        <p className={`closed-testing-message is-${state.status}`} role="status" aria-live="polite">
          {state.message}
        </p>
      ) : null}
      {duplicateEmail ? (
        <p className="closed-testing-message is-success" role="status" aria-live="polite">
          You&apos;re already on the list. Continue to closed testing below.
        </p>
      ) : null}
      {showNextSteps ? (
        <div className="closed-testing-next-steps" aria-label="Closed testing next steps">
          <div className="closed-testing-next-heading">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>Use the same Google account on your Android phone.</span>
          </div>
          {googleGroupJoinUrl ? (
            <div className="closed-testing-step-card">
              <span className="closed-testing-step-number">1</span>
              <span className="closed-testing-step-copy">
                <strong>Join the tester group</strong>
                <span>Click Join group in Google Groups, then come back here.</span>
              </span>
              <a href={googleGroupJoinUrl} className="closed-testing-step-button is-group" target="_blank" rel="noreferrer">
                <Users className="size-4 shrink-0" />
                Join group
              </a>
            </div>
          ) : null}
          {googlePlayTestingUrl ? (
            <div className="closed-testing-step-card">
              <span className="closed-testing-step-number">2</span>
              <span className="closed-testing-step-copy">
                <strong>Accept the Play test</strong>
                <span>Open the test link and choose Become a tester.</span>
              </span>
              <a href={googlePlayTestingUrl} className="closed-testing-step-button" target="_blank" rel="noreferrer">
                <ExternalLink className="size-4 shrink-0" />
                Open test
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function getStoredSubmittedEmails() {
  try {
    const storedValue = localStorage.getItem(submittedEmailsKey);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    return Array.isArray(parsedValue) ? parsedValue.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}
