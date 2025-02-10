import React, { useState } from "react";
import SearchableSelect from "../../../components/SearchableSelect";
import SearchableMultiSelect from "../../../components/SearchableMultiSelect";
import Button from "../../../components/Button";

import "../styles/FormSchedule.css";

function FormSchedule() {
    const [formData, setFormData] = useState({
        ficha: null,
        competencias: [],
        instructor: null,
        dia: null,
        sede: null,
        bloques: [],
        ambiente: null,
    });

    const [mensaje, setMensaje] = useState(""); // Estado para el mensaje
    const [formKey, setFormKey] = useState(Date.now()); // Clave para forzar reset

    const handleSelection = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            ficha: formData.ficha?.value,
            competencias: formData.competencias.map((item) => item.value),
            instructor: formData.instructor?.value,
            dia: formData.dia?.value,
            sede: formData.sede?.value,
            bloques: formData.bloques.map((item) => item.value),
            ambiente: formData.ambiente?.value,
        };

        try {
            const response = await fetch("http://localhost:5000/clasesProgramadas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setMensaje("✅ Formulario enviado con éxito");
                setFormData({ ficha: null, competencias: [], instructor: null, dia: null, sede: null, bloques: [], ambiente: null });
                setFormKey(Date.now()); // Cambia la clave para resetear el formulario
            } else {
                setMensaje("❌ Error al enviar el formulario");
            }
        } catch (error) {
            setMensaje("⚠️ Error de red, intenta nuevamente");
        }
    };

    return (
        <section className="contForm">
            {mensaje && <div className="mensaje-respuesta" aria-live="polite">{mensaje}</div>}
            <div className="contButtons">
                <Button children="Programar" />
                <Button children="Editar" />
            </div> 

            <form onSubmit={handleSubmit} key={formKey}>
                <div className="contOptions">
                    <SearchableSelect 
                        endpoint="http://localhost:5000/fichas" 
                        attribute="numero" 
                        onSelect={(value) => handleSelection("ficha", value)} 
                        placeholder="Ficha" 
                        value={formData.ficha} 
                    />

                    <SearchableSelect 
                        endpoint="http://localhost:5000/competencias" 
                        attribute="nombre"
                        onSelect={(value) => handleSelection("competencias", value)} 
                        placeholder="Competencias"
                        value={formData.competencias} 
                    />

                    <SearchableSelect 
                        endpoint="http://localhost:5000/instructores" 
                        attribute="nombre" 
                        onSelect={(value) => handleSelection("instructor", value)}
                        placeholder="Instructor" 
                        value={formData.instructor} 
                    />
                    <SearchableSelect 
                        endpoint="http://localhost:5000/dia"
                        attribute="dia" 
                        onSelect={(value) => handleSelection("dia", value)} 
                        placeholder="Día"
                        value={formData.dia} 
                    />
                    <SearchableSelect 
                        endpoint="http://localhost:5000/sedes" 
                        attribute="nombre" 
                        onSelect={(value) => handleSelection("sede", value)} 
                        placeholder="Sede"
                        value={formData.sede} 
                    />
                    <SearchableMultiSelect 
                        endpoint="http://localhost:5000/bloques" 
                        attribute="Descripcion" 
                        onSelect={(value) => handleSelection("bloques", value)} 
                        placeholder="Bloques"
                        value={formData.bloques} 
                    />
                    <SearchableSelect 
                        endpoint="http://localhost:5000/ambientes" 
                        attribute="numero" 
                        onSelect={(value) => handleSelection("ambiente", value)} 
                        placeholder="Ambiente"
                        value={formData.ambiente} 
                    />
                </div>
                <button type="submit" className="boton botonGrande">Enviar</button>
            </form>
        </section>
    );
}

export default FormSchedule;