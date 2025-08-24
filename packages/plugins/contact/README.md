## Waitlist Plugin

This plugin allows you to create a waitlist for your app. Users can sign up for the waitlist and receive an email when the app is ready.

### How it works

1. You disable sign up in your app from Supabase. This prevents any user from using the public API to sign up.
2. We create a new table in Supabase called `waitlist`. Users will sign up for the waitlist and their email will be stored in this table.
3. When you want to enable a sign up for a user, mark users as `approved` in the `waitlist` table.
4. The database trigger will create a new user in the `auth.users` table and send an email to the user with a link to set their password.
5. The user can now sign in to the app and update their password.

### Installation

Install the waitlist plugin from your main app:

```
pnpm add --filter web @kit/waitlist
```

#### Add migrations to your app

Make sure to place the waitlist migration in your app's migrations by moving the migration file from the plugin to the app's migration folder at `apps/web/supabase/migrations`.

Now, re-run the migrations:

```
pnpm run supabase:db:reset
pnpm run supabase:db:typegen
```

You can now use the waitlist plugin in your app.

#### Replace the sign up form

Replace your sign up form with the waitlist form:

```tsx
import { WaitlistSignupForm } from '@kit/waitlist';

function SignUpPage({ searchParams }: Props) {
  const inviteToken = searchParams.invite_token;

  const signInPath =
    pathsConfig.auth.signIn +
    (inviteToken ? `?invite_token=${inviteToken}` : '');

  return (
    <>
      <Heading level={4}>
        <Trans i18nKey={'auth:signUpHeading'} />
      </Heading>

      <WaitlistSignupForm />

      <div className={'justify-centers flex'}>
        <Button asChild variant={'link'} size={'sm'}>
          <Link href={signInPath}>
            <Trans i18nKey={'auth:alreadyHaveAnAccount'} />
          </Link>
        </Button>
      </div>
    </>
  );
}

export default withI18n(SignUpPage);
```

### Adding the Database Webhook to listen for new signups

Let's extend the DB handler at `apps/web/api/db/webhook/route.ts`:

```tsx
import { getDatabaseWebhookHandlerService } from '@kit/database-webhooks';
import { enhanceRouteHandler } from '@kit/next/routes';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import appConfig from '~/config/app.config';

/**
 * @name POST
 * @description POST handler for the webhook route that handles the webhook event
 */
export const POST = enhanceRouteHandler(
  async ({ request }) => {
    const service = getDatabaseWebhookHandlerService();

    try {
      // handle the webhook event
      await service.handleWebhook(request, {
        async handleEvent(payload) {
          if (payload.table === 'waitlist' && payload.record.approved) {
            const { handleApprovedUserChange } = await import(
                '@kit/waitlist/server'
            );
            
            const redirectTo = appConfig.url + pathsConfig.auth.passwordUpdate;
            
            await handleApprovedUserChange({
              email: payload.record.email,
              redirectTo,
            });
          }
        },
      });

      // return a successful response
      return new Response(null, { status: 200 });
    } catch (error) {
      // return an error response
      return new Response(null, { status: 500 });
    }
  },
  {
    auth: false,
  },
);
```

During dev, you can simply add the webhook to your seed file `apps/web/supabase/seed.sql`:

```sql
create trigger "waitlist_approved_update" after update
on "public"."waitlist" 
when (new.approved = true)
for each row
execute function "supabase_functions"."http_request"(
  'http://host.docker.internal:3000/api/db/webhook',
  'POST',
  '{"Content-Type":"application/json", "X-Supabase-Event-Signature":"WEBHOOKSECRET"}',
  '{}',
  '5000'
);
```

The above creates a trigger that listens for updates to the `waitlist` table and sends a POST request to the webhook route.

**Note**: You need to add this trigger to your production database as well. You will replace your `WEBHOOKSECRET` with the secret you set in your `.env` file and the `host.docker.internal:3000` with your production URL.
Just like you did for the other existing triggers.

### Approving users

Simply update the `approved` column in the `waitlist` table to `true` to approve a user. You can do so from the Supabase dashboard or by running a query.

Alternatively, run an update based on the created_at timestamp:

```sql
update public.waitlist
set approved = true
where created_at < '2024-07-01';
```

### Email Templates and URL Configuration

Please make sure to [edit the email template](https://makerkit.dev/docs/next-supabase-turbo/authentication-emails) in your Supabase account.
The default email in Supabase does not support PKCE and therefore does not work. By updating it - we replace the existing strategy with the token-based strategy - which the `confirm` route in Makerkit can support.

Additionally, [please add the following URL to your Supabase Redirect URLS allow list](https://supabase.com/docs/guides/auth/redirect-urls):

```
<your-url>/password-reset
```

This will allow Supabase to redirect users to your app to set their password after they click the email link.

If you don't do this - the email links will not work.

### Translations

Add the following translations to your `auth.json` translation:

```json
{
  "waitlist": {
    "heading": "Join the Waitlist for Early Access",
    "submitButton": "Join Waitlist",
    "error": "Ouch, we couldn't add you to the waitlist. Please try again.",
    "errorDescription": "We couldn't add you to the waitlist. If you have already signed up, you are already on the waitlist.",
    "success": "You're on the waitlist!",
    "successDescription": "We'll let you know when you can sign up."
  }
}
```

---

Easy peasy! Now you have a waitlist for your app.
