import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import './Doctors.css'; // Import CSS

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const handleAddDoctor = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/doctors/add', newDoctor)
            .then(response => {
                setDoctors([...doctors, response.data]);
                setNewDoctor({ name: '', specialty: '' });
            })
            .catch(error => console.error('Error adding doctor:', error));
    };

    const handleUpdateDoctor = (id, e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
            .then(() => {
                setDoctors(doctors.map(doctor => (doctor._id === id ? selectedDoctor : doctor)));
                setSelectedDoctor(null);
                setIsEditMode(false);
            })
            .catch(error => console.error('Error updating doctor:', error));
    };

    const handleDeleteDoctor = (id) => {
        axios.delete(`http://localhost:5000/doctors/delete/${id}`)
            .then(() => {
                setDoctors(doctors.filter(doctor => doctor._id !== id));
            })
            .catch(error => console.error('Error deleting doctor:', error));
    };

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsEditMode(true);
    };

    return (
        <div className='container'>
            {/* Left Section: Form */}
            <div className='form-container'>
                <h2>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h2>
                <form className='doctor-form' onSubmit={isEditMode ? (e) => handleUpdateDoctor(selectedDoctor._id, e) : handleAddDoctor}>
                    <label>Name:</label>
                    <input type='text' value={isEditMode ? selectedDoctor.name : newDoctor.name}
                        onChange={(e) => isEditMode ? setSelectedDoctor({ ...selectedDoctor, name: e.target.value }) : setNewDoctor({ ...newDoctor, name: e.target.value })} />

                    <label>Specialty:</label>
                    <input type='text' value={isEditMode ? selectedDoctor.specialty : newDoctor.specialty}
                        onChange={(e) => isEditMode ? setSelectedDoctor({ ...selectedDoctor, specialty: e.target.value }) : setNewDoctor({ ...newDoctor, specialty: e.target.value })} />

                    <button type='submit' className='btn-primary'>{isEditMode ? 'Update Doctor' : 'Add Doctor'}</button>
                </form>
            </div>

            {/* Right Section: Doctors List */}
            <div className='doctors-container'>
                <h3>Doctors ({doctors.length})</h3>
                <div className='doctor-list'>
                    {doctors.map(doctor => (
                        <DoctorCard key={doctor._id} doctor={doctor} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
