import { ArrowRight, Check, Copy, Mail } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { ENV } from '../config/env';
import { ENQUIRY_CHANNELS, type EnquiryChannel } from '../data/siteContent';
import { Reveal } from './Reveal';

interface FormState {
  channelId: EnquiryChannel['id'];
  name: string;
  email: string;
  organization: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionMode = 'idle' | 'submitting' | 'sent-api' | 'sent-mailto' | 'staged';

export function Contact() {
  const [form, setForm] = useState<FormState>({
    channelId: 'general',
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [mode, setMode] = useState<SubmissionMode>('idle');
  const [copied, setCopied] = useState(false);

  const activeChannel =
    ENQUIRY_CHANNELS.find((c) => c.id === form.channelId) ?? ENQUIRY_CHANNELS[0];

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    const emailTrimmed = form.email.trim();
    if (!emailTrimmed) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.message.trim().length < 15) {
      nextErrors.message = 'Please share a brief overview (at least 15 characters).';
    }
    return nextErrors;
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `[OWYRON] ${activeChannel.title} — ${form.name.trim()}`,
    );
    const bodyLines = [
      `Enquiry Type: ${activeChannel.title}`,
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.organization.trim() ? `Organization: ${form.organization.trim()}` : null,
      '',
      form.message.trim(),
    ]
      .filter((line): line is string => line !== null)
      .join('\n');

    return `mailto:${activeChannel.email}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitError('');

    if (ENV.contactFormEndpoint) {
      setMode('submitting');
      try {
        const res = await fetch(ENV.contactFormEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            channel: activeChannel.title,
            targetEmail: activeChannel.email || undefined,
            name: form.name.trim(),
            email: form.email.trim(),
            organization: form.organization.trim() || undefined,
            message: form.message.trim(),
          }),
        });

        if (!res.ok) {
          throw new Error(`Submission failed (${res.status})`);
        }
        setMode('sent-api');
      } catch {
        setMode('idle');
        setSubmitError(
          activeChannel.email
            ? `Unable to reach the form service right now. You can email us directly at ${activeChannel.email}.`
            : 'Unable to reach the form service right now. Please try again shortly.',
        );
      }
      return;
    }

    if (activeChannel.email) {
      window.location.assign(buildMailtoHref());
      setMode('sent-mailto');
      return;
    }

    setMode('staged');
  };

  const handleCopyPayload = async () => {
    const summary = [
      `OWYRON Enquiry — ${activeChannel.title}`,
      activeChannel.email ? `Recipient: ${activeChannel.email}` : null,
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.organization.trim() ? `Organization: ${form.organization.trim()}` : null,
      `Message:\n${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setMode('idle');
    setSubmitError('');
    setCopied(false);
    setForm((prev) => ({
      ...prev,
      name: '',
      email: '',
      organization: '',
      message: '',
    }));
  };

  const isCompleted = mode === 'sent-api' || mode === 'sent-mailto' || mode === 'staged';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-white/10 bg-[#060608] py-28 text-[#F5F6FA] sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Left column: headline & structured enquiry channels */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-3">
                <span className="h-2 w-2 bg-[#5843FF]" aria-hidden="true" />
                <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9CA3B4] uppercase">
                  05 / Contact
                </span>
              </div>

              <h2
                id="contact-heading"
                className="font-display mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl"
              >
                Let&apos;s build what comes next.
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-[#9CA3B4] sm:text-base">
                Connect with OWYRON regarding research conversations, strategic partnerships, or
                ambitious technical collaborations.
              </p>

              {/* Direct email channel when configured via environment */}
              {ENV.contactEmail && (
                <div className="mt-10 border border-white/12 bg-[#0C0D12] p-5">
                  <span className="font-mono-tech block text-[11px] tracking-[0.18em] text-[#666D80] uppercase">
                    Direct Contact
                  </span>
                  <a
                    href={`mailto:${ENV.contactEmail}`}
                    className="font-mono-tech mt-2 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-[#5843FF]"
                  >
                    <Mail className="h-4 w-4 text-[#5843FF]" />
                    <span>{ENV.contactEmail}</span>
                  </a>
                </div>
              )}

              {/* Selectable enquiry channels */}
              <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {ENQUIRY_CHANNELS.map((channel) => {
                  const isActive = form.channelId === channel.id;
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, channelId: channel.id }));
                        if (isCompleted) setMode('idle');
                      }}
                      className={`group flex w-full items-start justify-between gap-4 py-5 text-left transition-colors ${
                        isActive ? 'text-white' : 'text-[#9CA3B4] hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 transition-colors ${
                              isActive ? 'bg-[#5843FF]' : 'bg-white/25 group-hover:bg-white/60'
                            }`}
                          />
                          <span className="font-display text-base font-medium text-white">
                            {channel.title}
                          </span>
                        </div>
                        <p className="mt-1.5 pl-4 text-xs leading-relaxed text-[#9CA3B4]">
                          {channel.description}
                        </p>
                        {channel.email && (
                          <p className="font-mono-tech mt-1.5 pl-4 text-[11px] text-[#666D80]">
                            {channel.email}
                          </p>
                        )}
                      </div>
                      <span
                        className={`font-mono-tech shrink-0 text-[11px] uppercase ${
                          isActive ? 'text-[#5843FF]' : 'text-[#666D80]'
                        }`}
                      >
                        {isActive ? 'Active' : 'Select'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right column: interactive enquiry composer */}
            <div className="lg:col-span-7">
              <div className="border border-white/10 bg-[#0C0D12] p-6 sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
                  <div>
                    <span className="font-mono-tech block text-[11px] tracking-[0.18em] text-[#666D80] uppercase">
                      Enquiry Dispatch
                    </span>
                    <h3 className="font-display mt-1 text-xl font-medium text-white">
                      {activeChannel.title}
                    </h3>
                  </div>
                  <span className="font-mono-tech border border-[#5843FF]/40 bg-[#3815FC]/10 px-3 py-1 text-[11px] tracking-wider text-[#B4BAC8] uppercase">
                    {activeChannel.label}
                  </span>
                </div>

                {isCompleted ? (
                  <div className="py-10" role="status" aria-live="polite">
                    <div className="inline-flex h-10 w-10 items-center justify-center border border-[#5843FF] bg-[#3815FC]/20 text-white">
                      <Check className="h-5 w-5" />
                    </div>
                    <h4 className="font-display mt-6 text-2xl font-semibold text-white">
                      {mode === 'sent-api'
                        ? 'Enquiry Sent'
                        : mode === 'sent-mailto'
                          ? 'Mail Client Opened'
                          : 'Enquiry Ready'}
                    </h4>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#9CA3B4]">
                      {mode === 'sent-api'
                        ? `Your ${activeChannel.label.toLowerCase()} message has been delivered to OWYRON.`
                        : mode === 'sent-mailto'
                          ? `Your email client should open with a pre-filled draft addressed to ${activeChannel.email}. You can also copy the formatted summary below.`
                          : `Your ${activeChannel.label.toLowerCase()} brief is formatted and ready to copy below.`}
                    </p>

                    <div className="mt-6 border border-white/10 bg-[#060608] p-5 font-mono-tech text-xs leading-relaxed text-[#B4BAC8]">
                      <div>
                        <span className="text-[#666D80]">CHANNEL:</span> {activeChannel.title}
                      </div>
                      <div className="mt-1">
                        <span className="text-[#666D80]">FROM:</span> {form.name.trim()} &lt;
                        {form.email.trim()}&gt;
                      </div>
                      {form.organization.trim() && (
                        <div className="mt-1">
                          <span className="text-[#666D80]">ORG:</span> {form.organization.trim()}
                        </div>
                      )}
                      <div className="mt-3 border-t border-white/10 pt-3 whitespace-pre-wrap text-[#D1D5DF]">
                        {form.message.trim()}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.04] px-4 py-2.5 text-xs font-medium tracking-wider text-white uppercase transition-colors hover:border-[#5843FF]"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#5843FF]" />
                            <span>Copied Summary</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Summary</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs font-medium tracking-wider text-[#9CA3B4] uppercase underline-offset-4 hover:text-white hover:underline"
                      >
                        Compose Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                    <div>
                      <span className="font-mono-tech mb-2.5 block text-[11px] tracking-[0.18em] text-[#9CA3B4] uppercase">
                        Enquiry Type
                      </span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {ENQUIRY_CHANNELS.map((channel) => {
                          const selected = form.channelId === channel.id;
                          return (
                            <button
                              key={channel.id}
                              type="button"
                              onClick={() =>
                                setForm((prev) => ({ ...prev, channelId: channel.id }))
                              }
                              aria-pressed={selected}
                              className={`border px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                                selected
                                  ? 'border-[#5843FF] bg-[#3815FC]/15 text-white'
                                  : 'border-white/10 bg-[#060608] text-[#9CA3B4] hover:border-white/25 hover:text-white'
                              }`}
                            >
                              {channel.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="font-mono-tech mb-2 block text-[11px] tracking-[0.18em] text-[#9CA3B4] uppercase"
                        >
                          Name <span className="text-[#5843FF]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, name: e.target.value }));
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          placeholder="Full name"
                          className="w-full border border-white/15 bg-[#060608] px-4 py-3 text-sm text-white placeholder-[#525866] transition-colors focus:border-[#5843FF] focus:outline-none"
                        />
                        {errors.name && (
                          <p
                            id="contact-name-error"
                            role="alert"
                            className="mt-1.5 text-xs text-[#F87171]"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="font-mono-tech mb-2 block text-[11px] tracking-[0.18em] text-[#9CA3B4] uppercase"
                        >
                          Email <span className="text-[#5843FF]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, email: e.target.value }));
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          placeholder="Your email address"
                          className="w-full border border-white/15 bg-[#060608] px-4 py-3 text-sm text-white placeholder-[#525866] transition-colors focus:border-[#5843FF] focus:outline-none"
                        />
                        {errors.email && (
                          <p
                            id="contact-email-error"
                            role="alert"
                            className="mt-1.5 text-xs text-[#F87171]"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-organization"
                        className="font-mono-tech mb-2 block text-[11px] tracking-[0.18em] text-[#9CA3B4] uppercase"
                      >
                        Organization / Affiliation{' '}
                        <span className="text-[#666D80] lowercase">(optional)</span>
                      </label>
                      <input
                        id="contact-organization"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                        value={form.organization}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, organization: e.target.value }))
                        }
                        placeholder="Company, lab, or independent"
                        className="w-full border border-white/15 bg-[#060608] px-4 py-3 text-sm text-white placeholder-[#525866] transition-colors focus:border-[#5843FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="font-mono-tech mb-2 block text-[11px] tracking-[0.18em] text-[#9CA3B4] uppercase"
                      >
                        Message <span className="text-[#5843FF]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, message: e.target.value }));
                          if (errors.message) {
                            setErrors((prev) => ({ ...prev, message: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        placeholder="Share context on your enquiry, partnership direction, or technical collaboration..."
                        className="w-full resize-y border border-white/15 bg-[#060608] px-4 py-3 text-sm text-white placeholder-[#525866] transition-colors focus:border-[#5843FF] focus:outline-none"
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-1.5 text-xs text-[#F87171]"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <p role="alert" className="border border-[#F87171]/30 bg-[#F87171]/10 px-4 py-3 text-xs text-[#FCA5A5]">
                        {submitError}
                      </p>
                    )}

                    <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                      <p className="text-xs text-[#666D80]">
                        {activeChannel.email ? (
                          <>
                            Routing to{' '}
                            <span className="font-mono-tech text-[#9CA3B4]">
                              {activeChannel.email}
                            </span>
                          </>
                        ) : (
                          <span>{activeChannel.title}</span>
                        )}
                      </p>

                      <button
                        type="submit"
                        disabled={mode === 'submitting'}
                        className="group inline-flex items-center gap-3 bg-white px-6 py-3.5 text-sm font-medium tracking-wide text-[#060608] transition-all duration-200 hover:bg-[#3815FC] hover:text-white disabled:opacity-60"
                      >
                        <span>{mode === 'submitting' ? 'Sending...' : 'Submit Enquiry'}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
