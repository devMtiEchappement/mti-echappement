import { SitePageHeader } from '~/[locale]/(marketing)/_components/site-page-header';

export async function generateMetadata() {

  return {
    title: 'marketing:cookiePolicy',
  };
}

async function CookiePolicyPage() {

  return (
    <div>
      <SitePageHeader
        title={`marketing:cookiePolicy`}
        subtitle={`marketing:cookiePolicyDescription`}
      />

      <div className={'container mx-auto py-8'}>
        <div>Your terms of service content here</div>
      </div>
    </div>
  );
}

export default CookiePolicyPage;
