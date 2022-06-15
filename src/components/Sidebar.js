import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  let sidebarItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: "bx bx-grid-alt",
      path: "/",
    },
    {
      id: 2,
      name: "Students",
      icon: "bx bx-user",
      path: "/students",
    },
    {
      id: 3,
      name: "Teachers",
      icon: "bx bx-user-pin",
      path: "/teachers",
    },
    {
      id: 4,
      name: "Courses",
      icon: "bx bx-briefcase",
      path: "/courses",
    },
    {
      id: 5,
      name: "Subscriptions",
      icon: "bx bx-wallet-alt",
      path: "/subscriptions",
    },
    {
      id: 6,
      name: "Levels",
      icon: "bx bx-layer",
      path: "/levels",
    },
    {
      id: 7,
      name: "Expences",
      icon: "bx bx-line-chart-down",
      path: "/expences",
    },
    {
      id: 8,
      name: "Settings",
      icon: "bx bx-cog",
      path: "/settings",
    },
  ];
  const openSidebar = () => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    sidebar.classList.toggle("open");
    //calling the function(optional)
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="logo-details">
        <i className="bx bxl-c-plus-plus icon"></i>
        <div className="logo_name">AMA School</div>
        <i className="bx bx-menu" id="btn" onClick={openSidebar}></i>
      </div>
      <ul className="nav-list">
        <li>
          <i className="bx bx-search" onClick={openSidebar}></i>
          <input type="text" placeholder="Search..." />
          <span className="tooltip">Search</span>
        </li>
        {sidebarItems.map((item) => (
          <li key={item.id.toString()}>
            <a
              onClick={() => navigate(item.path)}
              className={
                window.location.href.split("/")[3] === item.path.split("/")[1]
                  ? "active"
                  : ""
              }
            >
              <i className={item.icon}></i>
              <span className="links_name">{item.name}</span>
            </a>
            <span className="tooltip">{item.name}</span>
          </li>
        ))}

        <a href="">
          <li className="profile">
            <div className="profile-details">
              <img src="./favicon.ico" alt="profileImg" />
              <div className="name_job">
                <div className="name">Jean Doe</div>
                <div className="job">School Manager</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
            <form
              id="logout-form"
              action=""
              method="POST"
              className="d-none"
            ></form>
          </li>
        </a>
      </ul>
    </div>
  );
}
