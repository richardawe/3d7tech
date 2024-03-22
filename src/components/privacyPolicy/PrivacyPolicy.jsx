import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import NavBar from '../navBar/NavBar';
import React from 'react';

/**
 * Privacy Policy Component.
 * This component displays the privacy policy information.
 * @component
 * @returns {JSX.Element} Privacy Policy Component
 */

const PrivacyPolicy = () => {
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Title className='fs-1 fw-bold'>Privacy Policy</Title>
        <Rule />
        <SectionStyle lg={12} className='row-cols-auto'>
          <Paragraph>
            This privacy policy (the "Privacy Policy") is an integral part of
            the terms and conditions and both documents should be read together.
            This Privacy Policy explains how 3D7 Technologies Limited,
            Manchester, M4 5EU (“3d7tech,” "We," "Us," or "Our") collects, uses,
            and protects Personal Information that We collect from or about you
            when you use Our website, applications, and services (collectively,
            the "Services"). The processing and collection of personal data is
            governed by the General Data Protection Regulation (the “GDPR”) UK
            General Data Protection Regulation ("UK GDPR") and whenever you
            provide 3d7tech such information, We will only use your information
            in line with all applicable data protection laws, including the GDPR
            and UK GDPR. At all times You are in control of Your information,
            and You can withdraw Your consent to provide Your information to
            3d7tech. 3d7tech is the data controller of the personal information
            We collect about you (i.e., the entity that determines the means and
            purposes of collecting, using, and disclosing the personal
            information). Please read this Privacy Policy carefully to
            understand what We do. If you do not understand any aspects of Our
            Privacy Notice, please feel free to contact Us at{' '}
            <Link href='mailto:support@3d7tech.com'>support@3d7tech.com</Link>
          </Paragraph>
          <SubTitle1>What Information Do We Collect?</SubTitle1>
          <Paragraph>
            When you access Our Services, We collect Personal Data provided by
            you or via a third party, if you create an account to use Our
            Services or communicate with Us as follows:
          </Paragraph>
          <SubTitle1>Personal Information You Provide</SubTitle1>
          <ul>
            <SubTitle2>
              <Paragraph>
                <strong>Account Information</strong>: When you create an account
                with Us, We will collect information associated with your
                account, including your name, contact information, account
                credentials, payment card information, and transaction history,
                (collectively, “Account Information”).
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>User Content</strong>: When you use Our Services, We
                collect Personal Information that is included in the input, file
                uploads, or feedback that you provide to Our Services
                (“Content”).
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Communication Information</strong>: If you communicate
                with Us, We collect your name, contact information, and the
                contents of any messages you send (“Communication Information”).
              </Paragraph>
            </SubTitle2>
          </ul>
          <SubTitle1>
            Personal Information We Receive Automatically From Your Use of the
            Services
          </SubTitle1>
          <ul>
            <SubTitle2>
              <Paragraph>
                <strong>Social Media Information</strong>: We have pages on
                social media sites like Instagram, Facebook, Medium, Twitter,
                YouTube and LinkedIn. When you interact with Our social media
                pages, We will collect Personal Information that you elect to
                provide to Us, such as your contact details (collectively,
                “Social Media Information”).
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Technical information</strong>:this includes the type of
                mobile device and internet browser you use, your computer IP
                address, data about the pages you access, mobile device ID or
                unique identifier, statistics on page views, standard Web log
                data, still and moving images, etc.(collectively, “Technical
                Information”).
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Usage data</strong>:We may automatically collect
                information about your use of the Services, the features you use
                and the actions you take, as well as your time zone,date, time
                of access, country, time spent using Our Services and device
                data, (collectively, “Usage data”).
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Cookies</strong>:We use cookies to operate and
                administer Our Services, and improve your experience. A “cookie”
                is a piece of information sent to your browser by a website you
                visit. You can set your browser to accept all cookies, to reject
                all cookies, or to notify you whenever a cookie is offered so
                that you can decide each time whether to accept it. However,
                refusing a cookie may in some cases preclude you from using, or
                negatively affect the display or function of, a website or
                certain areas or features of a website. For more details on
                cookies, please visit{' '}
                <Link
                  href='https://allaboutcookies.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  AllAboutCookies
                </Link>
                .
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Analytics</strong>:We may use a variety of online
                analytics products that use cookies to help Us analyze how users
                use Our Services and enhance your experience when you use the
                Services.
              </Paragraph>
            </SubTitle2>
          </ul>
          <SubTitle1>How We Use Your Data</SubTitle1>
          <Paragraph>
            We will only use your data for the purpose for which We collected
            it. Below are some ways We use Your Personal Data:{' '}
          </Paragraph>
          <ul>
            <SubTitle2>
              <Paragraph>
                <strong>
                  Identify And Provide the Right Service Or Content for You
                </strong>
                :We use information relating to your use of the Services to
                build higher quality, more useful Services by performing
                statistical analyses of Our users’ collective characteristics
                and behavior and by measuring demographics and interests
                regarding specific areas of the Services. This enables Us to
                create the Content most relevant to you and to improve Our
                Services generally.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Manage Your Relationship With Us</strong>: We use
                Personal Data that you provide to Us in order to allow you to
                register as a new user, access and use the Services, and in
                order to provide any information, products, or services that you
                request from Us.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Technical Support and Security</strong>: We use Personal
                Data to ensure the security of Our Services. We use Personal
                Data to manage risk or detect, prevent, and/or remediate fraud
                or other potentially prohibited or illegal activities. We may
                use Personal Data to provide technical support to you, where
                required.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Communication Updates</strong>: We use Personal Data
                collected when you sign-up for any update services to send you
                the messages in connection with theServices or Content
                Offerings. We may also archive this information and/or use it
                for future communications with you, where We are legally
                entitled to do so. When you send Us an e-mail message or
                otherwise contact Us, we may use the information provided by you
                to respond to your communication and/or as described in this
                Privacy Notice. We may also archive this information and/or use
                it for future communications with you where We are legally
                entitled to do so. When We send you emails, We may track how you
                interact with these emails (such as when you open an e-mail or
                click on a link inside an e-mail). We use this information to
                optimize and better tailor Our communications to you.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Identity Verification</strong>: For Services that
                require identity verification, We may use the Personal Data that
                We collect to verify your identity and authenticate that
                submissions made on the Services were made by you. This service
                may be provided through a third-party identity verification
                vendor. Your photo identification document will be deleted after
                successful verification of your profile information.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Aggregated or De-Identified Information</strong>: We may
                aggregate or de-identify Personal Information so that it may no
                longer be used to identify you and use such information to
                analyze the effectiveness of Our Services, to improve and add
                features to our Services, to conduct research and for other
                similar purposes. In addition, from time to time, We may analyze
                the general behavior and characteristics of users of Our
                Services and share aggregated information like general user
                statistics with third parties, publish such aggregated
                information or make such aggregated information generally
                available. We may collect aggregated information through the
                Services, through cookies, and through other means described in
                this Privacy Policy. We will maintain and use de-identified
                information in anonymous or de-identified form and We will not
                attempt to reidentify the information, unless required by law.
              </Paragraph>
            </SubTitle2>
          </ul>
          <SubTitle1>Disclosure of Personal Information</SubTitle1>
          <Paragraph>
            In certain circumstances We may provide your Personal Information to
            third parties without further notice to you, unless required by the
            law:
          </Paragraph>
          <ul>
            <SubTitle2>
              <Paragraph>
                <strong>
                  Government Authorities; Legal Rights and Actions
                </strong>
                : We may share your data with various government authorities in
                response to subpoenas, court orders, or other legal processes;
                to establish or exercise Our legal rights or to protect Our
                property; to defend against legal claims; or as otherwise
                required by law. In such cases, We reserve the right to raise or
                waive any legal objection or right available to Us. We also may
                share your Personal Data when We believe it is appropriate to
                investigate, prevent, or take action regarding illegal or
                suspected illegal activities; to protect and defend the rights,
                property, or safety of Our Services, Our users, customers, or
                others; and in connection with Our Terms and conditions.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Vendors and Service Providers</strong>: To assist Us in
                meeting business operations needs and to perform certain
                services and functions, We may provide Personal Information to
                vendors and service providers, including providers of hosting
                services, cloud services, and other information technology
                services providers, email communication software, and web
                analytics services, among others. Pursuant to Our instructions,
                these parties will access, process, or store Personal
                Information only in the course of performing their duties to Us.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Business Transfers</strong>: If We are involved in
                strategic transactions, reorganization, bankruptcy,
                receivership, or transition of service to another provider
                (collectively, a “Transaction”), your Personal Information and
                other information may be disclosed in the diligence process with
                counterparties and others assisting with the Transaction and
                transferred to a successor or affiliate as part of that
                Transaction along with other assets.
              </Paragraph>
            </SubTitle2>
            <SubTitle2>
              <Paragraph>
                <strong>Affiliates</strong>: We may disclose Personal
                Information to Our affiliates, meaning an entity that controls,
                is controlled by, or is under common control with 3d7Tech. Our
                affiliates may use the Personal Information We share in a manner
                consistent with this Privacy Policy.
              </Paragraph>
            </SubTitle2>
          </ul>
          <SubTitle1>Retention of Personal Information:</SubTitle1>
          <Paragraph>
            We will keep your personal information for as long as it is required
            and according to the purpose it is being processed for, and/or as
            required to comply with applicable laws and establish, exercise, or
            defend Our legal rights. We will keep the personal data for a period
            which enables Us to handle or respond to any complaints, queries, or
            concerns relating to Our relationship with you.
          </Paragraph>
          <SubTitle1>Your Rights Regarding Your Personal Information</SubTitle1>
          <Paragraph>
            Depending on location, individuals in the EEA, the UK, and across
            the globe may have certain statutory rights in relation to their
            Personal Information. For example, you may have the right to:
          </Paragraph>
          <ul>
            <SubTitle2>
              To access Your personal data and receive a copy of Your personal
              data upon Your request;
            </SubTitle2>
            <SubTitle2>
              To rectify, erase or restrict Your information upon Your request
              (right to be forgotten);
            </SubTitle2>
            <SubTitle2>
              To object to the processing of Your information;
            </SubTitle2>
            <SubTitle2>
              Transfer your Personal Information to a third party (right to data
              portability).
            </SubTitle2>
            <SubTitle2>
              To withdraw Your consent to processing at any time;
            </SubTitle2>
            <SubTitle2>
              Lodge a complaint with your local data protection authority.
            </SubTitle2>
            <SubTitle2>
              Withdraw consent at any time where We are relying on consent to
              process your data. However, this will not affect the lawfulness of
              any processing carried out before you withdraw your consent. If
              you withdraw your consent, We may not be able to provide certain
              products or services to you. We will advise you if this is the
              case at the time you withdraw your consent.
            </SubTitle2>
          </ul>
          <Paragraph>
            No fees are required for exercising any of the above rights.
            However, and subject to the GDPR, We may charge You a reasonable fee
            including administration fees if Your request is repetitive or
            excessive or demands that We bear excessive and/or expensive
            efforts.
          </Paragraph>
          <Paragraph>
            To exercise your rights, please contact the 3d7tech’s Data
            Protection Officer at the following contact details:
          </Paragraph>
          <Address>
            <strong>3d7 Technologies Limited</strong>
            <br />
            Manchester
            <br />
            M4 5EU
            <br />
            <Link href='mailto:support@3d7tech.com'>support@3d7tech.com</Link>
            <br />
            <Link href='https://www.3d7tech.com'>3d7tech.com</Link>
          </Address>
          <SubTitle1>International Data Transfers</SubTitle1>
          <Paragraph>
            We offer EU Model Clauses, also known as Standard Contractual
            Clauses, to meet the adequacy and security requirements for our
            customers that operate in the European Union and the United Kingdom,
            and make transfers of Personal Information from those jurisdictions
            to the United States and other countries that lack adequacy
            determinations. Please contact us as detailed in the “Contact Us”
            section below for more information.
          </Paragraph>
          <SubTitle1>A Note About Accuracy</SubTitle1>
          <Paragraph>
            Services like DocuHelpAI generate responses by reading a user’s
            request and, in response, predicting the words most likely to appear
            next. In some cases, the words most likely to appear next may not be
            the most factually accurate. For this reason, you should not rely on
            the factual accuracy of output from Our models. If you notice that
            DocuHelpAI output contains factually inaccurate information about
            you and you would like us to correct the inaccuracy, you may submit
            a correction request to{' '}
            <Link href='mailto:support@3d7tech.com'>support@3d7tech.com</Link>.
            Given the technical complexity of how Our models work, We may not be
            able to correct the inaccuracy in every instance. In that case, you
            may request that We remove your Information from DocuHelpAI output
            by filling out this form.
          </Paragraph>
          <SubTitle1>Data Security</SubTitle1>
          <Paragraph>
            3d7tech takes appropriate security measures for data security
            purposes to help prevent unauthorized persons from gaining access to
            Your personal information. However, no system can be completely
            secure. Therefore, 3d7tech does not warrant that its services will
            be totally immune to any breaches of security and/or unauthorized
            access, including access to the data stored in the Services,
            although We will contact You upon a breach of Your data security
            with accordance to any applicable law.
          </Paragraph>
          <Paragraph>
            3d7tech inspects, from time to time, the data security of the
            Services and performs modifications and upgrades accordingly in
            order to keep the Service’s security. Nonetheless, 3d7tech will not
            be liable for any direct or indirect damage caused to You due to
            exposure of Your information by an unauthorized access to Our
            database and/or due to any negligence or act not controlled by Us.
          </Paragraph>
          <SubTitle1>Minors</SubTitle1>
          <Paragraph>
            We do not knowingly collect or solicit information from anyone under
            the age of eighteen (18) or knowingly allow minors to use the
            Service or any of Our Services. If We become aware that We have
            collected information from a minor without the consent of his/her
            parent or guardian, We will immediately remove such collected
            information and block his/her access to the Service and/or any of
            Our Services.
          </Paragraph>
          <SubTitle1>Links To Other Websites</SubTitle1>
          <Paragraph>
            The Services may contain links to other websites not operated or
            controlled by 3d7tech, including social media services (“Third Party
            Sites”). The information that you share with Third Party Sites will
            be governed by the specific privacy policies and terms of service of
            the Third Party Sites and not by this Privacy Policy. By providing
            these links We do not imply that We endorse or have reviewed these
            sites. Please contact the Third Party Sites directly for information
            on their privacy practices and policies.
          </Paragraph>
          <SubTitle1>Changes To The Privacy Policy</SubTitle1>
          <Paragraph>
            We may update this Privacy Policy periodically as We offer new
            products and services, and as Our business, technology, and
            applicable laws change. You can determine when this Privacy Policy
            was last revised by referring to the “Last Updated” referenced
            below. Any changes will become effective upon posting of the revised
            Privacy Policy.
          </Paragraph>
          <SubTitle1>Contact Us</SubTitle1>
          <Paragraph>
            We always want to hear from Our customers. If you have any questions
            or feedback, please contact us via email:{' '}
            <Link href='mailto:support@3d7tech.com'>support@3d7tech.com</Link>
          </Paragraph>
          <h4>Last Updated: 3rd July, 2023</h4>
        </SectionStyle>
      </Wrapper>
    </Container>
  );
};
const Wrapper = styled.div`
  margin-top: 5rem;
`;
const SectionStyle = styled(Col)`
  margin-inline-start: 15rem;
  @media (min-width: 280px) and (max-width: 912px) {
    margin-inline-start: 0;
  }
  @media (min-width: 1024px) {
    margin-inline-start: 1rem;
  }
`;
const Paragraph = styled.p`
  color: var(--text-color, #0d0c0d);
  font-size: 1rem;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.00563rem;
  width: 50vw;
  @media (min-width: 280px) and (max-width: 912px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 100%;
  }
`;
const Rule = styled.hr`
  border: 1px solid #079be6;
`;
const SubTitle1 = styled.h2`
    margin-top:3rem;
    font-weight:700;
`;
const SubTitle2 = styled.li`
font-weight:700;
font-size:1rem
`;
const Address = styled.address`
  color: 4435F6;
  font-size: 1rem;
  text-decoration: none;
`;
export const Title = styled.h1`
  color: #079be6;
  font-size: 4rem;
  font-style: normal;
  font-weight: 900;
  line-height: 140%;
  letter-spacing: -0.02rem;
  text-align: center;
  //   margin-bottom: 4.5rem;

  //   @media (max-width: 800px) {
  //     font-size: 2rem;
  //     margin-bottom: 3rem;
  //   }
`;
const Link = styled.a`
  color: #079be6;
`;
export default PrivacyPolicy;
