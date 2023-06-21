import React from "react";
import Menu from "./MenuTop";

const Layout = (props: React.PropsWithChildren) => {
  return (
    <div>
      <Menu />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
