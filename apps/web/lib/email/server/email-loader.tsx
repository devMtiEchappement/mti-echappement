import { renderTestEmail } from '@kit/email-templates';
import { renderContactEmail } from '@kit/email-templates';

// Définir des types explicites pour les templates disponibles
type EmailTemplateId = 'test-email' | 'contact-email' | string;

export async function loadEmailTemplate(id: EmailTemplateId, variables: { [key: string]: string } = {}) {
  switch (id) {
    case 'test-email':
      return renderTestEmail({
        'productName': `${variables.productName}`,
        'userName': `${variables.userName}`
      });
    case 'contact-email':
      return renderContactEmail({
        'email': `${variables.email}`,
      });

    default:
      throw new Error(`Email template not found: ${id}`);
  }
}