import React from "react";
import {
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  FormControl,
} from "react-bootstrap";

import "./GroupMenu.scss";

const GroupMenu = ({ name }) => {
  return (
    <Navbar className="group-detail-navbar" bg="light" expand="lg">
      <Navbar.Brand href="#home">그룹 관리</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={`/group/${name}`} className="group-detail-menu">
            그룹 통계
          </Nav.Link>
          <Nav.Link href={`/group/${name}/rank`} className="group-detail-menu">
            그룹 내 랭킹
          </Nav.Link>
          <NavDropdown
            title="과제 관리"
            id="basic-nav-dropdown"
            className="group-detail-menu"
          >
            <NavDropdown.Item href="#action/3.2">출석 관리</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">
              수동 과제 지정
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="유저명 검색"
            className="mr-sm-2"
          />
          <Button variant="outline-primary" className="group-detail-button">
            검색
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GroupMenu;
