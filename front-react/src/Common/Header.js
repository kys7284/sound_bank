import { useState, useRef, useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import '../Css/Common/Header.css';

const Header = () => {
  // 현재 열려 있는 드롭다운 메뉴 ID를 저장
  const [showDropdown, setShowDropdown] = useState(null);

  // 드롭다운 메뉴 DOM 참조 저장 (마우스 벗어날 때 처리를 위해)
  const dropdownRefs = useRef({});

  // 현재 페이지 경로 확인 (메인 페이지인지 판단)
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  // 메뉴 항목에 마우스를 올렸을 때 드롭다운 표시
  const handleMouseEnter = (id) => {
    setShowDropdown(id);
  };

  // 메뉴 밖으로 마우스가 나갔을 때 드롭다운 숨김
  const handleMouseLeave = (event) => {
    if (
      dropdownRefs.current[showDropdown] &&
      !dropdownRefs.current[showDropdown].contains(event.relatedTarget)
    ) {
      setShowDropdown(null);
    }
  };

  // 드롭다운 내부에 마우스 들어왔을 때 (닫히는 것 방지)
  const handleDropdownMouseEnter = (id) => {
    setShowDropdown(id);
  };

  // 드롭다운 내부에서 마우스가 벗어났을 때 드롭다운 닫기
  const handleDropdownMouseLeave = (event, id) => {
    if (
      dropdownRefs.current[id] &&
      !dropdownRefs.current[id].contains(event.relatedTarget)
    ) {
      setShowDropdown(null);
    }
  };

  // 드롭다운 요소 참조 저장 + 클릭 외부 감지해서 드롭다운 닫기
  useEffect(() => {
    const dropdownElements = document.querySelectorAll('.NavDropdown-menu');
    dropdownElements.forEach((element) => {
      const id = element.id;
      dropdownRefs.current[id] = element;
    });

    const handleDocumentClick = (event) => {
      const isInsideDropdown = Object.values(dropdownRefs.current).some(
        (dropdownEl) => dropdownEl && dropdownEl.contains(event.target)
      );
      if (!isInsideDropdown) {
        setShowDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <Navbar
      variant="dark"
      className={`nav-bar ${isMainPage ? 'nav-bar-main' : 'nav-bar-default'}`}
      fixed="top"
      expand="md"
    >
      <Container fluid>
        {/* 햄버거 메뉴 (모바일 화면용) */}
        <Navbar.Toggle aria-controls="nav-menu" className="menu-toggle" />

        {/* 로고 이미지 */}
        <Navbar.Brand className="logo">
          <img
            src="./Images/logo.png"
            alt="Sound Bank Logo"
            width="70"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Collapse id="nav-menu">
          <Nav className="menu">
            {/* 홈 */}
            <Link to="/" className="nav-item">Home</Link>

            {/* 예/적금 메뉴 */}
            <NavDropdown
              title="예/적금"
              id="deposit-menu"
              className="NavDropdown-menu"
              show={showDropdown === 'deposit-menu'}
              onMouseEnter={() => handleMouseEnter('deposit-menu')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="NavDropdown-menu"
                onMouseEnter={() => handleDropdownMouseEnter('deposit-menu')}
                onMouseLeave={(event) => handleDropdownMouseLeave(event, 'deposit-menu')}
              >
                <div className="deposit-saving-row">
                  <ul>
                    <NavDropdown.Item as={Link} to="/test">예금</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">예금소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">예금소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">예금소메뉴</NavDropdown.Item></li>
                  </ul>
                  <ul>
                    <NavDropdown.Item as={Link} to="#">적금</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">적금소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">적금소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">적금소메뉴</NavDropdown.Item></li>
                  </ul>
                </div>
              </div>
            </NavDropdown>

            {/* 조회/이체 메뉴 */}
            <NavDropdown
              title="조회/이체"
              id="transfer-menu"
              className="NavDropdown-menu"
              show={showDropdown === 'transfer-menu'}
              onMouseEnter={() => handleMouseEnter('transfer-menu')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="dropdown-items-container"
                onMouseEnter={() => handleDropdownMouseEnter('transfer-menu')}
                onMouseLeave={(event) => handleDropdownMouseLeave(event, 'transfer-menu')}
              >
                <div className="deposit-saving-row">
                  <ul>
                    <NavDropdown.Item as={Link} to="#">조회</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">조회소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">조회소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">조회소메뉴</NavDropdown.Item></li>
                  </ul>
                  <ul>
                    <NavDropdown.Item as={Link} to="#">이체</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">이체소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">이체소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">이체소메뉴</NavDropdown.Item></li>
                  </ul>
                </div>
              </div>
            </NavDropdown>

            {/* 대출 메뉴 */}
            <NavDropdown
              title="대출"
              id="loan-menu"
              className="NavDropdown-menu"
              show={showDropdown === 'loan-menu'}
              onMouseEnter={() => handleMouseEnter('loan-menu')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="dropdown-items-container"
                onMouseEnter={() => handleDropdownMouseEnter('loan-menu')}
                onMouseLeave={(event) => handleDropdownMouseLeave(event, 'loan-menu')}
              >
                <div className="deposit-saving-row">
                  <ul>
                    <NavDropdown.Item as={Link} to="#">대출1</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">대출1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">대출1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">대출1소메뉴</NavDropdown.Item></li>
                  </ul>
                  <ul>
                    <NavDropdown.Item as={Link} to="#">대출2</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">대출2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">대출2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">대출2소메뉴</NavDropdown.Item></li>
                  </ul>
                </div>
              </div>
            </NavDropdown>

            {/* 펀드 메뉴 */}
            <NavDropdown
              title="펀드"
              id="fund-menu"
              className="NavDropdown-menu"
              show={showDropdown === 'fund-menu'}
              onMouseEnter={() => handleMouseEnter('fund-menu')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="dropdown-items-container"
                onMouseEnter={() => handleDropdownMouseEnter('fund-menu')}
                onMouseLeave={(event) => handleDropdownMouseLeave(event, 'fund-menu')}
              >
                <div className="deposit-saving-row">
                  <ul>
                    <NavDropdown.Item as={Link} to="#">펀드1</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">펀드1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">펀드1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">펀드1소메뉴</NavDropdown.Item></li>
                  </ul>
                  <ul>
                    <NavDropdown.Item as={Link} to="#">펀드2</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">펀드2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">펀드2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">펀드2소메뉴</NavDropdown.Item></li>
                  </ul>
                </div>
              </div>
            </NavDropdown>

            {/* 외환 메뉴 */}
            <NavDropdown
              title="외환"
              id="forex-menu"
              className="NavDropdown-menu"
              show={showDropdown === 'forex-menu'}
              onMouseEnter={() => handleMouseEnter('forex-menu')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="dropdown-items-container"
                onMouseEnter={() => handleDropdownMouseEnter('forex-menu')}
                onMouseLeave={(event) => handleDropdownMouseLeave(event, 'forex-menu')}
              >
                <div className="deposit-saving-row">
                  <ul>
                    <NavDropdown.Item as={Link} to="#">외환1</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">외환1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">외환1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">외환1소메뉴</NavDropdown.Item></li>
                  </ul>
                  <ul>
                    <NavDropdown.Item as={Link} to="#">외환2</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">외환2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">외환2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">외환2소메뉴</NavDropdown.Item></li>
                  </ul>
                </div>
              </div>
            </NavDropdown>

            {/* 고객센터 메뉴 */}
            <NavDropdown
              title="고객센터"
              id="support-menu"
              className="NavDropdown-menu"
              show={showDropdown === 'support-menu'}
              onMouseEnter={() => handleMouseEnter('support-menu')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="dropdown-items-container"
                onMouseEnter={() => handleDropdownMouseEnter('support-menu')}
                onMouseLeave={(event) => handleDropdownMouseLeave(event, 'support-menu')}
              >
                <div className="deposit-saving-row">
                  <ul>
                    <NavDropdown.Item as={Link} to="#">고객센터</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">고객센터1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">고객센터1소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">고객센터1소메뉴</NavDropdown.Item></li>
                  </ul>
                  <ul>
                    <NavDropdown.Item as={Link} to="#">고객센터</NavDropdown.Item>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">고객센터2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">고객센터2소메뉴</NavDropdown.Item></li>
                    <li><NavDropdown.Item className="sub-item" as={Link} to="#">고객센터2소메뉴</NavDropdown.Item></li>
                  </ul>
                </div>
              </div>
            </NavDropdown>

            {/* 검색창 */}
            <Form className="search-box">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input"
              />
              <Button className="search-btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </Form>
          </Nav>

          {/* 계좌개설/로그인 버튼 */}
          <div className="auth-buttons">
            <Link to="/signup" className="auth-btn signup-btn">계좌개설</Link>
            <Link to="/login" className="auth-btn login-btn">로그인</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
