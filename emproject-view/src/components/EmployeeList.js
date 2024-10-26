import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        EmployeeService.deleteEmployeeById(id)
            .then(() => {
                setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
            })
            .catch((error) => console.log(error));
    };

    const editEmployee = (e, id) => {
        e.preventDefault();
        navigate(`/editEmployee/${id}`);
    };

    const navigate = useNavigate();

    return (
        <div className="container px-20  mx-auto my-8">
            <div>
                <button
                    onClick={() => navigate("/addEmployee")}
                    className="bg-fuchsia-400 hover:text-black hover:bg-white my-12 font-semibold px-20 py-2 rounded"> 
                    Add Employee 🔯
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <table className="shadow">
                        <thead className="bg-fuchsia-400">
                            <tr>
                                <th className="px-6 py-3 uppercase tracking-wide">Name</th>
                                <th className="px-6 py-3 uppercase tracking-wide">Phone</th>
                                <th className="px-6 py-3 uppercase tracking-wide">Email</th>
                                <th className="px-6 py-3 uppercase tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-white hover:text-black">
                                        <td className="text-left px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">{employee.phone}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <a 
                                                onClick={(e) => editEmployee(e, employee.id)}
                                                className='font-bold text-fuchsia-200 hover:text-green-500 hover:cursor-pointer'> 
                                                Edit 📝 
                                            </a>
                                            <a 
                                                onClick={(e) => deleteEmployee(e, employee.id)}
                                                className='font-bold text-fuchsia-200 hover:text-red-500 hover:cursor-pointer'> 
                                                Delete 🗑️
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center px-6 py-4"> No employees found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EmployeeList;
