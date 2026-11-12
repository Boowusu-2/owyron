function readEnv(value: string | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

const primaryEmail = readEnv(import.meta.env.VITE_CONTACT_EMAIL);

export const ENV = {
  contactEmail: primaryEmail,
  partnershipEmail: readEnv(import.meta.env.VITE_PARTNERSHIP_EMAIL) || primaryEmail,
  collaborationEmail: readEnv(import.meta.env.VITE_COLLABORATION_EMAIL) || primaryEmail,
  contactFormEndpoint: readEnv(import.meta.env.VITE_CONTACT_FORM_ENDPOINT),
  siteUrl: readEnv(import.meta.env.VITE_SITE_URL),
} as const;

