'use server';

import { templatesEmailSchema } from '@kit/email-templates';
import { getMailer } from '@kit/mailers';
import { enhanceAction } from '@kit/next/actions';
import { loadEmailTemplate } from './email-loader';
import { getLogger } from '@kit/shared/logger';


export async function sendEmail(params: {
  id: string;
  data: { [key: string]: string},
  to?: string,
  from?: string,

}) {

  const { id, data, to, from } = params;
  const logger = await getLogger();
  const mailer = await getMailer();

  const template = await loadEmailTemplate(id, data);

  try {
    logger.info({ id, data}, 'Sending email...');

    if(!template?.html){
      logger.info({ id }, 'HTML is missing');
      return { success: false, error: 'HTML is missing' };
    }
    if(!template?.subject){
      logger.info({ id }, 'Subject is missing');
      return { success: false, error: 'Subject is missing' };
    }

    const result = await mailer.sendEmail({
      html: template.html,
      from: from || 'test@from.fr',
      to: to || 'test@to.fr',
      subject: template.subject,
    });
    return { success: true, data: result };
  } catch (error) {
    logger.error({ error },'Error sending email');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Action d'envoi d'email avec validation selon le template
export const sendEmailAction = enhanceAction(
  async (params) => sendEmail(params),
  {
    schema: templatesEmailSchema
  }
);
