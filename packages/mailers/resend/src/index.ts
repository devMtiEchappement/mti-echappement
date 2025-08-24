import 'server-only';

import { z } from 'zod';

import { Mailer, MailerSchema } from '@kit/mailers-shared';

type Config = z.infer<typeof MailerSchema>;
type Configs = Config[];


const RESEND_API_KEY = z
  .string({
    description: 'The API key for the Resend API',
    required_error: 'Please provide the API key for the Resend API',
  })
  .parse(process.env.RESEND_API_KEY);

export function createResendMailer() {
  return new ResendMailer();
}

/**
 * A class representing a mailer using the Resend HTTP API.
 * @implements {Mailer}
 */
class ResendMailer implements Mailer {
  async sendEmail(config: Config) {
    const contentObject =
      'text' in config
        ? {
            text: config.text,
          }
        : {
            html: config.html,
          };

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: config.subject,
        ...contentObject,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${res.statusText}`);
    }
  }

  /**
   * Envoie des emails en lots, en se basant sur un tableau de configurations.
   * Les emails sont envoyés par blocs de 100, avec la gestion des appels pour les emails restants.
   * @param {Configs[]} configs - Tableau des configurations des emails.
   */
  async sendEmails(configs: Configs) {
    const splitIntoBatches = (list: Configs, batchSize: number) => {
      const batches = [];
      for (let i = 0; i < list.length; i += batchSize) {
        batches.push(list.slice(i, i + batchSize));
      }
      return batches;
    };

    const batches = splitIntoBatches(configs, 100);

    for (const batch of batches) {
      try {
        // Envoi du lot actuel
        await this.sendBatch(batch);
        console.log(`Batch successfully sent: ${batch.length} emails.`);
      } catch (error) {
        console.error('Error while sending batch:', error);
      }
    }
  }

  /**
   * Sends personalized emails in batches using `/emails/batch` endpoint.
   */
  private async sendBatch(configs: Configs ) {
    // Transform each email object to the required format for "/emails/batch"
    const emailPayload = configs.map((config ) => {
      const contentObject =
          'text' in config
              ? { text: config.text }
              : { html: config.html };

      return {
        to: config.to,
        from: config.from,
        subject: config.subject,
        ...contentObject,
      };
    });

    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        emails: emailPayload, // `emails` is the expected payload for the batch endpoint
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send batch emails: ${res.statusText}`);
    }
  }
}


