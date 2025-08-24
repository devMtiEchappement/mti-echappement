import {
  Body,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
  render,
} from '@react-email/components';

import { BodyStyle } from '../components/body-style';
import { EmailContent } from '../components/content';
import { EmailFooter } from '../components/footer';
import { EmailHeader } from '../components/header';
import { EmailHeading } from '../components/heading';
import { EmailWrapper } from '../components/wrapper';

interface Props {
  email: string;
}

export async function renderContactEmail(props: Props) {
  if (!props.email) {
    return (
      console.log('email name is required')
    )
  }

  const subject = `Test message - ${props.email}`;
  const html = await render(
    <Html>
      <Head>
        <BodyStyle />
      </Head>

      <Preview>{'email test'}</Preview>

      <Tailwind>
        <Body>
          <EmailWrapper>
            <EmailHeader>
              <EmailHeading>{'email test'}</EmailHeading>
            </EmailHeader>

            <EmailContent>
              <Text className="text-[16px] leading-[24px] text-[#242424]">
                {'hello'}
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#242424]">
                {'this email is a test'}
              </Text>


            </EmailContent>

            <EmailFooter>{`Send by ${props.email}`}</EmailFooter>
          </EmailWrapper>
        </Body>
      </Tailwind>
    </Html>,
  );

  return {
    html,
    subject,
  };
}
