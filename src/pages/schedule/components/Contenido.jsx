import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ScheduleTable from "./ScheduleTable";
import "../styles/Contenido.css";

function Contenido() {
    const [selectedHost, setSelectedHost] = useState(null);

    return (
        <div className="contInfoPage">
            <div className="contHeader">
                <SearchBar onSelectHost={setSelectedHost} />

                <h1 id="titular">
                    {selectedHost ? `${selectedHost.value}` : "Selecciona un titular"}
                </h1>
                <div className="headerButtons">

                </div>
            </div>
            <ScheduleTable hostType={selectedHost?.type} hostValue={selectedHost?.value} />
        </div>
    );
}
  
export default Contenido;