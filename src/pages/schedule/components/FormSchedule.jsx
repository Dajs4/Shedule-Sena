import React from "react";

//Components
import SearchableSelect from "../../../components/SearchableSelect";

//Styles
import "../styles/FormSchedule.css"

function FormSchedule() {
    const handleSelection = (selectedItem) => {
      console.log("Seleccionado:", selectedItem);
      // Aquí puedes guardar el valor en el estado del formulario
    };

    return (
        <section className="contForm">
            <form action="post">
                <div className="contOptions">
                <SearchableSelect 
                    endpoint="http://localhost:5000/fichas"  
                    attribute="numero" 
                    onSelect={handleSelection} 
                    text="Ficha" 
                />

                <SearchableSelect 
                    endpoint="http://localhost:5000/competencias"  
                    attribute="nombre" 
                    onSelect={handleSelection} 
                    text="Competencia" 
                />

                <SearchableSelect 
                    endpoint="http://localhost:5000/instructores"  
                    attribute="nombre" 
                    onSelect={handleSelection} 
                    text="Instructor" 
                />

                <SearchableSelect 
                    endpoint="http://localhost:5000/dia"  
                    attribute="dia"
                    onSelect={handleSelection} 
                    text="Dia" 
                />

                <SearchableSelect 
                    endpoint="http://localhost:5000/sedes"  
                    attribute="nombre" 
                    onSelect={handleSelection} 
                    text="Sede" 
                />

                <SearchableSelect 
                    endpoint="http://localhost:5000/bloques"  
                    attribute="Descripcion" 
                    onSelect={handleSelection} 
                    text="Bloque" 
                />

                <SearchableSelect 
                    endpoint="http://localhost:5000/ambientes"  
                    attribute="numero" 
                    onSelect={handleSelection} 
                    text="Ambiente"
                />

                </div>
            </form>

        </section>
    );
}
  
export default FormSchedule;