/* eslint-disable react/prop-types */
import { DialogContainer } from './Layout';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; // Full viewport height
  background-color: #f7f7f7;
`;

const Header = styled.header`
  flex-shrink: 0; // Prevents the header from shrinking
  padding: 20px 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: auto; // To handle overflow content
  padding: 0 20px;
  gap: 20px;
  margin: 20px 0;
`;

const Main = styled.main`
  flex: 3; // Main content takes most of the space

  border-radius: 10px;
`;

const Aside = styled.aside`
  border-radius: 10px;
`;

const Footer = styled.footer`
  flex-shrink: 0; // Prevents the footer from shrinking
  padding: 20px 60px;
  background-color: #ffffff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const PageLayout = ({ header, children, aside, footer }) => {
  return (
    <Container>
      <Header>{header}</Header>
      <Wrapper>
        <Main>{children}</Main>
        <Aside>{aside}</Aside>
      </Wrapper>
      <Footer>{footer}</Footer>
      <DialogContainer />
    </Container>
  );
};

export default PageLayout;
