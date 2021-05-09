import React from "react";
import { Form, Nav, Navbar, NavDropdown, Button, FormControl } from "react-bootstrap";

import "./GroupMenu.scss";

const GroupMenu = ({ groupId, setGroupMenu }) => {
  return (
    <Navbar className="group-detail-navbar" bg="light" expand="lg">
      <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => setGroupMenu(() => "main")}>
        그룹 메뉴
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            to={`/group/${groupId}/attendance`}
            className="group-detail-menu"
            onClick={() => setGroupMenu(() => "attendance")}
          >
            출석부
          </Nav.Link>
          <Nav.Link
            to={`/group/${groupId}/problems`}
            className="group-detail-menu"
            onClick={() => setGroupMenu(() => "problems")}
          >
            문제집
          </Nav.Link>
          <Nav.Link
            to={`/group/${groupId}/rank`}
            className="group-detail-menu"
            onClick={() => setGroupMenu(() => "rank")}
          >
            멤버 랭킹
          </Nav.Link>
          <NavDropdown title="공지사항" id="basic-nav-dropdown" className="group-detail-menu">
            <NavDropdown.Item onClick={() => setGroupMenu(() => "noti-job")}>
              소프트웨어직 채용 정보
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setGroupMenu(() => "noti-contest")}>
              코딩 테스트 & 대회 정보
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="유저명 검색" className="mr-sm-2" />
          <Button variant="outline-primary" className="group-detail-button">
            검색
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GroupMenu;
