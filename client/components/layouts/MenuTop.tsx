import React, { useEffect, useState } from "react";
import { Button, Col, Menu, Row } from "antd";
import classes from "./index.module.scss";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { MENU_ITEMS } from "@/constants/menu";
import Link from "next/link";

type Props = {};

const MenuTop = (props: Props) => {
  const [current, setCurrent] = useState("mail");
  const [windowWidth, setWindowWidth] = useState(1300);
  const [toggleMenu, setToggleMenu] = useState(false);

  // to get screenwidht for managing responsiveness as screenwidht decrease or increase
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  // action to be performed after clicking menu
  const onClick = (e: { key: string }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  // for responsive menu declaring area
  let logoSpan = 6,
    buttonSpan = 3,
    menuSpan = 15;
  if (windowWidth > 930 && windowWidth <= 1200) {
    logoSpan = 24;
    menuSpan = 20;
    buttonSpan = 4;
  } else if (windowWidth < 930) {
    logoSpan = 16;
    buttonSpan = 5;
  }

  return (
    <div>
      <div
        className={`${windowWidth > 930 && classes.stickMenu} ${
          classes.menuTop
        }`}
      >
        <Row>
          <Col
            span={4}
            lg={4}
            sm={3}
            xs={windowWidth > 320 ? 4 : 5}
            className={classes.menuButton}
          >
            <Button
              onClick={() => setToggleMenu(true)}
              className={classes.menuButtonIcon}
              style={{
                marginBottom: 16,
              }}
            >
              <MenuOutlined />
            </Button>
          </Col>
          <Col
            span={logoSpan}
            md={logoSpan}
            sm={15}
            xs={windowWidth > 320 ? 12 : 11}
          >
            <h2 style={{ color: "#fff" }}>SimpleAI</h2>
            {/* <img src="applogo.png" alt="app logo" className={classes.appLogo} /> */}
          </Col>
          <Col
            span={menuSpan}
            sm={menuSpan}
            xs={24}
            className={`${classes.upperMenu} ${
              toggleMenu ? classes.showMenu : classes.hideMenu
            }`}
          >
            <CloseOutlined
              className={classes.closeIcon}
              onClick={() => setToggleMenu(false)}
            />
            <Menu
              className={classes.menuWithItems}
              onClick={onClick}
              selectedKeys={[current]}
              mode={windowWidth <= 930 ? "inline" : "horizontal"}
              items={MENU_ITEMS}
            />
          </Col>
          <Col
            span={buttonSpan}
            md={buttonSpan}
            sm={6}
            xs={8}
            className={classes.buttonArea}
          >
            <Link href="/auth/signup">
              <Button
                size={windowWidth <= 930 ? "middle" : "large"}
                className={classes.exploreButton}
                type="primary"
              >
                Get Started
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MenuTop;
