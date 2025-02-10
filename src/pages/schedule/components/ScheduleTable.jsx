import React, { useState, useEffect } from "react";
import "../styles/ScheduleTable.css";

const ScheduleTable = ({ hostType, hostValue }) => {
    const [schedule, setSchedule] = useState([]);
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const timeBlocks = [
        "7:00 - 8:45", "8:45 - 10:00", "10:30 - 12:20", "12:40 - 2:20", 
        "2:20 - 4:00", "4:30 - 6:00", "6:10 - 7:50"
    ];

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch("http://localhost:5000/clasesProgramadas");
                const data = await response.json();
                
                const filteredData = data.filter(item => item[hostType]?.toString() === hostValue?.toString());
                setSchedule(filteredData);
            } catch (error) {
                console.error("Error fetching schedule data:", error);
            }
        };
        
        setSchedule([]); // Borrar la información del titular anterior
        if (hostType && hostValue) {
            fetchSchedule();
        }
    }, [hostType, hostValue]);

    const getClassInfo = (day, time) => {
        if (!hostType || !hostValue) {
            return (
                <div className="class-info">
                    <div className="tematica">Temática</div>
                    <div className="instructor">Instructor</div>
                    <div className="ambiente">Ambiente</div>
                </div>
            );
        }

        const classesForSlot = schedule.filter(classItem => 
            classItem.dia === day && classItem.bloques?.includes(time)
        );

        return (
            <div className="class-info">
                <div className="tematica">{classesForSlot.length ? `Temática: ${classesForSlot[0].tematica || ""}` : ""}</div>
                {hostType !== "instructor" && <div className="instructor">{classesForSlot.length ? `Instructor: ${classesForSlot[0].instructor || ""}` : ""}</div>}
                {hostType !== "ficha" && <div className="ficha">{classesForSlot.length ? `Ficha: ${classesForSlot[0].ficha || ""}` : ""}</div>}
                {hostType !== "ambiente" && <div className="ambiente">{classesForSlot.length ? `Ambiente: ${classesForSlot[0].ambiente || ""} - ${classesForSlot[0].sede || ""}` : ""}</div>}
            </div>
        );
    };

    return (
        <div className="schedule-container">
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th><div className="horaHorario">Horario</div></th>
                        {days.map(day => <th key={day}>{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {timeBlocks.map(time => (
                        <tr key={time}>
                            <td><div className="horaHorario">{time}</div></td>
                            {days.map(day => (
                                <td key={day}>{getClassInfo(day, time)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;