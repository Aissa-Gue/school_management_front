import Container from "@mui/material/Container";
import Header from "./Header";
import { React } from "react";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>

      <main className="home-section">
        {/* Header */}
        <Header />

        {/* CONTENT HERE */}
        <Container maxWidth="" className="my-2">
          {props.children}
        </Container>
        {/* END CONTENT */}
      </main>
    </div>
  );
}
