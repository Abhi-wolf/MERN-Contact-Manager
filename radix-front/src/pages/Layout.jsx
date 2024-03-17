import Header from "../components/Header";
import Contacts from "../components/Contacts";

function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center ">
      <Header />
      <Contacts />
    </div>
  );
}

export default Layout;
