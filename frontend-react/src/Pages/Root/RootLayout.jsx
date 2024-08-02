import { Outlet } from "react-router-dom";
import MainNavigation from "../../Components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <h1>Root Layout Page</h1>
      <Outlet />
    </>
  );
}

export default RootLayout;
