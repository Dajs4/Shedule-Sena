import React, { useState, useEffect } from "react";
import "../styles/SearchableSelect.css";

const SearchableSelect = ({ endpoint, attribute, onSelect, text }) => {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Cargar opciones desde el endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setOptions(data);
        setFilteredOptions(data); // Muestra todas las opciones inicialmente
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [endpoint]);

  // Filtra las opciones según el texto de búsqueda
  useEffect(() => {
    if (search === "") {
      setFilteredOptions(options); // Si el search está vacío, muestra todas las opciones
    } else {
      setFilteredOptions(
        options.filter((item) =>
          item[attribute]?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, options, attribute]);

  // Maneja la selección de una opción
  const handleSelect = (item) => {
    setSearch(item[attribute]); // Establece el texto del input con la opción seleccionada
    setSelected({ id: item.id, value: item[attribute] }); // Guarda la opción seleccionada
    onSelect({ id: item.id, value: item[attribute] }); // Llama la función onSelect pasando el id y el valor
  };

  return (
    <div className="contSelect">
      <input
        type="text"
        placeholder={text}
        value={search}
        onFocus={() => setFilteredOptions(options)} // Muestra todas las opciones al enfocar
        onChange={(e) => setSearch(e.target.value)} // Filtra las opciones según el texto
      />
      {/* Mostrar resultados filtrados */}
      <div className="contResults">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)} // Selecciona la opción al hacer clic
              className="result"
            >
              {item[attribute]}
            </div>
          ))
        ) : (
          <div className="noResults">No hay resultados</div>
        )}
      </div>
      {/* Mostrar la opción seleccionada */}
      {selected && (
        <div className="selectedOption">
          Opción seleccionada: {selected.value}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;