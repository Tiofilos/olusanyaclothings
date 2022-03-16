import {
  Container,
} from 'react-bootstrap';

import Navigation from '../Navigation';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />

      {children}

      <Container className="py-5">
        <p className="float-end">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Back to top</a>
        </p>
        <p>&copy; 2022 Victoria Hall Theatre.</p>
      </Container>
    </>
  );
}
