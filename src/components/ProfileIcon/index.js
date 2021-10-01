import "./styles.css";
import { useState } from "react";
import profile from "../../assets/profile.svg";
import edit from "../../assets/edit-icon.svg";
import logout from "../../assets/log-out.svg";

export default function ProfileIcon(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  function handleLogout() {}
  return (
    <div className="main">
      <div className="profile-container">
        <img
          className="profile-icon mr-xl mt-lg"
          src={profile}
          onClick={() => setShowDropdown(!showDropdown)}
          alt="profile-icon"
        />
        {showDropdown ? (
          <div className="dropdown flex-column content-center items-center mr-xl mt-md">
            <div className="flex-row items-center">
              <img src={edit} alt="edit" />
              <span>Editar</span>
            </div>
            <div onClick={handleLogout} className="flex-row items-center">
              <img src={logout} alt="logout" />
              <span>Deslogar</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {props.children}
    </div>
  );
}
