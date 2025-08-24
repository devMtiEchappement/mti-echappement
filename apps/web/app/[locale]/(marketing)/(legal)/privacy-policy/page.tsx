import { SitePageHeader } from '~/[locale]/(marketing)/_components/site-page-header';

export async function generateMetadata() {

  return {
    title: 'marketing:privacyPolicy',
  };
}

async function PrivacyPolicyPage() {

  return (
    <div>
      <SitePageHeader
        title={'marketing:privacyPolicy'}
        subtitle={'marketing:privacyPolicyDescription'}
      />

      <div className={'container mx-auto py-8'}>
        <div>Your terms of service content here</div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
