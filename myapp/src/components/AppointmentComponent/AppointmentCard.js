import React from 'react';
import './Appointments.css'

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
    return (
        <div className='appointment-card'>
            <p><span>Patient:</span> {appointment.patientName}</p>
            <p><span>Doctor:</span> {appointment.doctorName}</p>
            <p><span>Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>

            <div className='btn-container'>
                <button className='btn-edit' onClick={() => onEdit(appointment)}>Edit</button>
                <button className='btn-delete' onClick={() => onDelete(appointment._id)}>Delete</button>
            </div>
        </div>
    );
};

export default AppointmentCard;
