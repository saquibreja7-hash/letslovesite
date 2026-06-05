"use client";

import { useActionState, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { Send, X } from "lucide-react";

import { requestClosedTestingAccess } from "@/app/actions";

const initialState = {
  status: "idle" as const,
  message: "",
};

const submittedEmailsKey = "lets-love-closed-testing-emails";

type ClosedTestingFormProps = {
  className?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="closed-testing-button" type="submit" disabled={pending}>
      <Send className="size-4 shrink-0" />
      {pending ? "Saving spot" : "Join Early Access"}
    </button>
  );
}

export function ClosedTestingForm({ className = "" }: ClosedTestingFormProps) {
  const firstNameInputId = useId();
  const emailInputId = useId();
  const modalFirstNameInputId = useId();
  const modalEmailInputId = useId();
  const desktopFormRef = useRef<HTMLFormElement>(null);
  const mobileFormRef = useRef<HTMLFormElement>(null);
  const lastSubmittedEmailRef = useRef("");
  const [duplicateEmail, setDuplicateEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction] = useActionState(requestClosedTestingAccess, initialState);

  useEffect(() => {
    if (state.status === "success") {
      const submittedEmail = lastSubmittedEmailRef.current;

      if (submittedEmail) {
        const existingEmails = getStoredSubmittedEmails();
        if (!existingEmails.includes(submittedEmail)) {
          localStorage.setItem(submittedEmailsKey, JSON.stringify([...existingEmails, submittedEmail]));
        }
      }

      desktopFormRef.current?.reset();
      mobileFormRef.current?.reset();
      setTimeout(() => setIsModalOpen(false), 0);
    }
  }, [state.status]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim().toLowerCase();

    if (email && getStoredSubmittedEmails().includes(email)) {
      event.preventDefault();
      setDuplicateEmail(email);
      event.currentTarget.reset();
      setIsModalOpen(false);
      return;
    }

    lastSubmittedEmailRef.current = email;
    setDuplicateEmail("");
  };

  return (
    <div className={`closed-testing-wrap ${className}`}>
      <form
        ref={desktopFormRef}
        action={formAction}
        className="closed-testing-form closed-testing-desktop-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor={firstNameInputId} className="sr-only">
          First name for Early Access
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
          Email address for Early Access
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
      <button className="closed-testing-mobile-trigger" type="button" onClick={() => setIsModalOpen(true)}>
        <Send className="size-4 shrink-0" />
        Join Early Access
      </button>
      {!duplicateEmail && state.message ? (
        <p className={`closed-testing-message is-${state.status}`} role="status" aria-live="polite">
          {state.message}
        </p>
      ) : null}
      {duplicateEmail ? (
        <p className="closed-testing-message is-success" role="status" aria-live="polite">
          You&apos;re already on the list. If the email has not arrived yet, please wait a minute and check spam or promotions.
        </p>
      ) : null}
      {isModalOpen ? (
        <div className="closed-testing-modal-backdrop" role="presentation" onMouseDown={() => setIsModalOpen(false)}>
          <div
            className="closed-testing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${modalFirstNameInputId}-title`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="closed-testing-modal-close" type="button" aria-label="Close Early Access form" onClick={() => setIsModalOpen(false)}>
              <X className="size-4" />
            </button>
            <div className="closed-testing-modal-copy">
              <h2 id={`${modalFirstNameInputId}-title`}>Join Early Access</h2>
              <p>We&apos;ll save your spot first, then email your testing steps and voucher shortly.</p>
            </div>
            <form
              ref={mobileFormRef}
              action={formAction}
              className="closed-testing-form closed-testing-modal-form"
              onSubmit={handleSubmit}
            >
              <label htmlFor={modalFirstNameInputId} className="sr-only">
                First name for Early Access
              </label>
              <input
                id={modalFirstNameInputId}
                className="closed-testing-input is-name"
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="First name"
                required
              />
              <label htmlFor={modalEmailInputId} className="sr-only">
                Email address for Early Access
              </label>
              <input
                id={modalEmailInputId}
                className="closed-testing-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                required
              />
              <SubmitButton />
            </form>
          </div>
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
