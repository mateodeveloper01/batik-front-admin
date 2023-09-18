import Nav from "./Nav";

const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen">
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
