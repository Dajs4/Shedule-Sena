import React, { useState, useEffect } from "react";
import { FaList, FaUsers, FaUserAlt } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import "../styles/SearchBar.css"

function SearchBar({ onSelectHost }) {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState(["fichas", "instructores", "ambientes"]);
    const [results, setResults] = useState([]);
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const endpoints = {
        fichas: "http://localhost:5000/fichas",
        instructores: "http://localhost:5000/instructores",
        ambientes: "http://localhost:5000/ambientes"
    };

    useEffect(() => {
        if (query.trim() === "" && !isFocused) {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            try {
                let fetchedData = [];
                for (const key of filters) {
                    const response = await fetch(endpoints[key]);
                    const data = await response.json();
                    fetchedData = [...fetchedData, ...data];
                }

                const filteredData = fetchedData.filter(item =>
                    item.numero?.toString().includes(query) || item.nombre?.toLowerCase().includes(query.toLowerCase())
                );

                setResults(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [query, filters, isFocused]);

    const toggleFilter = (type) => {
        setFilters(prev => prev.includes(type) 
            ? prev.filter(f => f !== type) 
            : [...prev, type]
        );
    };

    const handleSelect = (item) => {
        const type = item.nombre ? "instructor" : "ficha";
        onSelectHost({ type, value: item.nombre || item.numero }); // Pasa el anfitrión a HostInfoPanel
        setQuery("");
        setResults([]);
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                <button className="filter-button" onClick={() => setShowFilterOptions(!showFilterOptions)}>
                    <IoFilterSharp />
                </button>
                {showFilterOptions && (
                    <div className="filter-options">
                    <label className="filter-label">
                        <input type="checkbox" checked={filters.includes("fichas")} onChange={() => toggleFilter("fichas")} />
                        <FaUsers className={`icon ${filters.includes("fichas") ? "selected" : ""}`} />
                    </label>
                    <label className="filter-label">
                        <input type="checkbox" checked={filters.includes("instructores")} onChange={() => toggleFilter("instructores")} />
                        <FaUserAlt className={`icon ${filters.includes("instructores") ? "selected" : ""}`} />
                    </label>
                    <label className="filter-label">
                        <input type="checkbox" checked={filters.includes("ambientes")} onChange={() => toggleFilter("ambientes")} />
                        <FaList className={`icon ${filters.includes("ambientes") ? "selected" : ""}`} />
                    </label>
                </div>
                )}
                <ul className="search-results">
                    {results.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {item.nombre || item.numero}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;