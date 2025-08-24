'use server';

import { enhanceAction } from '@kit/next/actions';
import { sendEmailAction } from 'apps/web/lib/email/server/server-actions';

import { ContactSchema } from './schema/contact.schema';
import { createWaitlistService } from './waitlist.service';

/**
 * @name signUpToWaitlistAction
 * @description Signs up an email to the waitlist
 * @param params
 */
export const sendContactEmailAction = enhanceAction(
  async (data) => {

    // insert the email
    const { error } = await sendEmail("data);

    if (error) {
      console.error(error);

      throw new Error('Failed to send contact email ');
    }

    return {
      success: true,
    };
  },
  {
    schema: ContactSchema
  },
);
