'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Trans } from '@kit/ui/trans';

import { ContactFormSchema } from 'src/lib/schema/contact-form.schema';
import { signUpToWaitlistAction } from '../lib/server/server-actions';

function ContactFormSubmissionSuccess() {
  return (
    <Alert variant={'success'}>
      <AlertTitle>
        auth:waitlist.success
      </AlertTitle>

      <AlertDescription>
       auth:waitlist.successDescription
      </AlertDescription>
    </Alert>
  );
}

function ContactFormSubmissionError() {
  return (
    <Alert variant={'destructive'}>
      <AlertTitle>
        auth:waitlist.error
      </AlertTitle>

      <AlertDescription>
       auth:waitlist.errorDescription
      </AlertDescription>
    </Alert>
  );
}

export function ContactForm(props: {
  inviteToken: string | undefined;
  captchaToken?: string | undefined;
}) {
  const [state, setState] = useState({
    error: '',
    success: false,
  });

  const [pending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(SignupWaitlistSchema),
    defaultValues: {
      email: '',
      inviteToken: props.inviteToken,
      captchaToken: props.captchaToken,
    },
  });

  if (state.success) {
    return <ContactFormSubmissionSuccess />;
  }

  if (state.error) {
    return <ContactFormSubmissionError />;
  }

  return (
    <Form {...form}>
      <form
        className={'flex w-full flex-col space-y-4'}
        onSubmit={form.handleSubmit((data) => {
          startTransition(() => {

          });
        })}
      >
        <FormField
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Trans i18nKey={'auth:emailAddress'} />
                </FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            );
          }}
          name={'email'}
        />

        <Button disabled={pending}>
         auth:waitlist.submitButton
        </Button>
      </form>
    </Form>
  );
}
