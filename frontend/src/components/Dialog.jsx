// /* eslint-disable react/prop-types */
// import { useRef, useEffect } from 'react';
// import styled from '@emotion/styled';

// const DialogWrapper = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 20px;
//   max-width: 500px;
//   margin: 0 auto;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// const Header = styled.header`
//   font-size: 1.25em;
//   margin-bottom: 20px;
// `;

// const Main = styled.main`
//   margin-bottom: 20px;
// `;

// const Footer = styled.footer`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
// `;

// const Dialog = ({ header, children, footer }) => {
//   const footerRef = useRef(null);

//   useEffect(() => {
//     if (!footerRef.current) return;

//     const buttons = Array.from(footerRef.current.querySelectorAll('button'));
//     if (buttons.length === 0) return;

//     const activeButton = buttons[buttons.length - 1];
//     activeButton.focus();
//   }, [footer]);

//   return (
//     <DialogWrapper>
//       {header && <Header>{header}</Header>}
//       <Main>{children}</Main>
//       {footer && <Footer ref={footerRef}>{footer}</Footer>}
//     </DialogWrapper>
//   );
// };

// export default Dialog;
