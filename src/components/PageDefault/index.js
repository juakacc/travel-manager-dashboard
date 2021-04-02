import React from "react";
import { Container } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PageDefault({ children }) {

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div>
          {children}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
