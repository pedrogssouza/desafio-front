import "./styles.css";
import React from "react";
import { NavLink } from "react-router-dom";
import academy from "../../assets/academy-white.svg";
import home from "../../assets/home.svg";
import charges from "../../assets/charges.svg";
import clients from "../../assets/clients.svg";
import { useHistory } from "react-router";

export default function Sidebar(props) {
  const history = useHistory();
  return (
    <div className="page">
      <aside className="sidebar-content flex-column items-center">
        <img src={academy} alt="cubos-academy" className="mb-lg mt-lg"></img>
        <div className="sidebar-links-container">
          <NavLink
            exact
            to="/"
            className="sidebar-link first-link flex-row items-center "
            activeClassName="route-selected"
          >
            <img src={home} alt="home" className="sidebar-icon mr-md" />
            Home
          </NavLink>
          <NavLink
            to="/cobrancas"
            className="sidebar-link second-link flex-row items-center"
            activeClassName="route-selected"
          >
            <img src={charges} alt="cobrancas" className="sidebar-icon mr-md" />
            Cobranças
          </NavLink>
          <NavLink
            to="/clientes"
            className="sidebar-link third-link flex-row items-center"
            activeClassName="route-selected"
          >
            <img src={clients} alt="clientes" className="sidebar-icon mr-md" />
            Clientes
          </NavLink>
        </div>
        <button
          className="sidebar-btn btn-pink on mb-xl"
          onClick={() => history.push("/cobrancas/adicionar")}
        >
          Criar cobrança
        </button>
      </aside>
      {props.children}
    </div>
  );
}
