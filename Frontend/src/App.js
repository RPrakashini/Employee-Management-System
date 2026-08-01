import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import Footer from './Footer';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

const fetchEmployees = () => {
  axios.get('/employees')
    .then(response => setEmployees(response.data))
    .catch(error => console.error(error));
};

useEffect(() => {
  fetchEmployees();
}, []);

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = () => {
  fetchEmployees();
};

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const clearSelection = () => {
    setSelectedEmployee(null);
  };

  return (
  <div className="container mt-4">

    <div className="text-center mb-5">
      <i className="bi bi-cloud-fill text-primary" style={{ fontSize: "60px" }}></i>

      <h1 className="display-4 fw-bold text-primary">
        CloudOps HR Suite
      </h1>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5>Total Employees</h5>
              <h2 className="text-primary">{employees.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5>AWS Status</h5>
              <h2 className="text-success">Healthy</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5>Database</h5>
              <h2 className="text-info">Amazon RDS</h2>
            </div>
          </div>
        </div>

      </div>

      <p className="lead text-secondary">
        Enterprise Employee Management Portal
      </p>
    </div>

    <div className="row">
      <div className="col-md-6">
        <EmployeeForm
          onAddEmployee={addEmployee}
          onUpdateEmployee={updateEmployee}
          selectedEmployee={selectedEmployee}
          onClearSelection={clearSelection}
        />
      </div>

      <div className="col-md-6">
        <EmployeeTable
          employees={employees}
          onDeleteEmployee={deleteEmployee}
          onSelectEmployee={selectEmployee}
        />
      </div>
    </div>

    <Footer />

  </div>
);
}

export default App;
