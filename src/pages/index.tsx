import { GetServerSidePropsContext } from 'next';

import styled from 'styled-components';

import { User } from '../web/types';

import Container from '../web/components/ui/Container';

import Header from '../web/components/common/Header';
import Introduction from '../web/components/landing/Introduction';
import Partners from '../web/components/landing/Partners';
import Services from '../web/components/landing/Services';
import CreditForm from '../web/components/landing/CreditForm';
import InquiryBanner from '../web/components/landing/InquiryBanner';
import CompanyInformation from '../web/components/landing/CompanyInformation';

const LandingPageContainer = styled(Container)`
  min-width: 320px !important;
`;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const {
    token, type, profileImage,
  } = req.cookies;

  return {
    props: {
      user: {
        loggedIn: !!token,
        type: type || '',
        profileImage: profileImage || '',
      },
    },
  };
}

type LandingPageProps = {
  user: User;
}

export default function LandingPage({ user }: LandingPageProps) {
  return (
    <LandingPageContainer>
      <Header
        loggedIn={user.loggedIn}
        profileImage={user.profileImage}
      />
      <Introduction />
      <Partners />
      <Services />
      <CreditForm />
      <InquiryBanner />
      <CompanyInformation />
    </LandingPageContainer>
  );
}
