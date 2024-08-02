import { Outlet } from "react-router-dom";
import MainNavigation from "../../Components/MainNavigation";

function RootLayout() {
  return (
    <div className="container">
      <MainNavigation />
      <h1>Root Layout Page</h1>
      <Outlet />
    </div>
  );
}

export default RootLayout;
