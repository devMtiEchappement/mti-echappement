import { SitePageHeader } from '~/[locale]/(marketing)/_components/site-page-header';

export async function generateMetadata() {

  return {
    title: 'marketing:termsOfService',
  };
}

async function TermsOfServicePage() {

  return (
    <div>
      <SitePageHeader
        title={`marketing:termsOfService`}
        subtitle={`marketing:termsOfServiceDescription`}
      />

      <div className={'container mx-auto py-8'}>
        <div>Your terms of service content here</div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
