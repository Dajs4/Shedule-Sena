import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

function MainLayout() {
    return (
        <section className="app">
            <NavBar />
            <main className="contPage">
                <Outlet />  {/* Aquí se renderiza la página actual */}
            </main>
        </section>
    );
}
  
export default MainLayout;