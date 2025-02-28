import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "../styles/Select.css";

const SearchableSelect = ({ endpoint, attribute, onSelect, text, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  // Cargar opciones desde el endpoint
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        // Mapear los datos al formato necesario para react-select
        const formattedOptions = data.map(item => ({
          value: item[attribute], // Usar el atributo especificado
          label: item[attribute]  // Mostrar el mismo valor, puedes personalizarlo si quieres
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error al cargar las opciones:", error);
      }
    };

    fetchOptions();
  }, [endpoint, attribute]);

  // Manejar cambio de selección
  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption); // Actualiza el valor seleccionado
    onSelect(selectedOption); // Llama a la función pasada como prop
  };

  return (
    <div>
      <label>{text}</label>
      <Select
        options={options}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder || "Selecciona una opción"}
        className="basic-single"
        classNamePrefix="custom-select"
      />
    </div>
  );
};

export default SearchableSelect;
