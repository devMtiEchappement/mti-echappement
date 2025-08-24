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
  productName: string;
  userName: string ;
}

export async function renderTestEmail(props: Props) {

  const subject = `Test message - ${props.productName}`;
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

            <EmailFooter>{`Send by ${props.userName}`}</EmailFooter>
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
