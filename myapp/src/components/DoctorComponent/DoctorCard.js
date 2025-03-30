import React from 'react';
import './Doctors.css'; // Import CSS

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
    return (
        <div className='doctor-card'>
            <p><span>Name:</span> {doctor.name}</p>
            <p><span>Specialty:</span> {doctor.specialty}</p>

            <div className='btn-container'>
                <button className='btn-edit' onClick={() => onEdit(doctor)}>Edit</button>
                <button className='btn-delete' onClick={() => onDelete(doctor._id)}>Delete</button>
            </div>
        </div>
    );
};

export default DoctorCard;
