import React from 'react';
import './Patients.css';

const PatientCard = ({ patient, onEdit, onDelete }) => {
    return (
        <div className='patient-card'>
            <p><span>Name:</span> {patient.name}</p>
            <p><span>Age:</span> {patient.age}</p>
            <p><span>Gender:</span> {patient.gender}</p>

            <div className='btn-container'>
                <button className='btn-edit' onClick={() => onEdit(patient)}>Edit</button>
                <button className='btn-delete' onClick={() => onDelete(patient._id)}>Delete</button>
            </div>
        </div>
    );
};

export default PatientCard;
