import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Appointments from './components/AppointmentComponent/Appointments';
import Doctors from './components/DoctorComponent/Doctors';
import Patients from './components/PatientComponent/Patients';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className='app-container'>
                {/* Header */}
                <header className='app-header'>
                    <h1>🏥 Hospital Management System</h1>
                </header>

                {/* Navigation Bar */}
                <nav className='navbar'>
                    <ul>
                        <li>
                            <NavLink to='/appointments' className='nav-link' activeClassName='active'>
                                📅 Appointments
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/doctors' className='nav-link' activeClassName='active'>
                                👨‍⚕️ Doctors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/patients' className='nav-link' activeClassName='active'>
                                🏥 Patients
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className='main-content'>
                    <Routes>
                        <Route path='/appointments' element={<Appointments />} />
                        <Route path='/' element={<Appointments />} />
                        <Route path='/doctors' element={<Doctors />} />
                        <Route path='/patients' element={<Patients />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className='footer'>
                    <p>© {new Date().getFullYear()} Hospital Management System | All Rights Reserved</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
