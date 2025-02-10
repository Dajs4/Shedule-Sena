import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "../styles/Select.css";

const SearchableMultiSelect = ({ endpoint, attribute, onSelect, text, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  // Cargar opciones desde el endpoint
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        // Mapear los datos al formato necesario para react-select (para selección múltiple)
        const formattedOptions = data.map(item => ({
          value: item[attribute],  // Usar el atributo especificado
          label: item[attribute]   // Mostrar el mismo valor, puedes personalizarlo si quieres
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error al cargar las opciones:", error);
      }
    };

    fetchOptions();
  }, [endpoint, attribute]);

  // Manejar cambio de selección
  const handleChange = (selectedOptions) => {
    setSelectedValues(selectedOptions || []); // Actualiza el valor seleccionado
    onSelect(selectedOptions || []);           // Llama a la función pasada como prop
  };

  return (
    <div>
      <label>{text}</label>
      <Select
        isMulti
        options={options}
        value={selectedValues}
        onChange={handleChange}
        placeholder={placeholder || "Selecciona una o más opciones"}
        className="basic-multi-select"
        classNamePrefix="custom-select"
      />
    </div>
  );
};

export default SearchableMultiSelect;