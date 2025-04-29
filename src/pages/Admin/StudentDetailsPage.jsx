import { useState, useEffect } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import axios from 'axios';
import { Get_All_Students_EndPoint, Get_Students_By_Course_Semester_EndPoint } from '../../utils/constants';

const StudentDetailsPage = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [showDropdown, setShowDropdown] = useState({ course: false, semester: false });
    const [filteredStudents, setFilteredStudents] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sample data - replace with API calls later
    const courses = ['BCA', 'MCA', 'BTech', 'MTech'];
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

    useEffect(() => {
        fetchAllStudents();
    }, []);

    const fetchAllStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(Get_All_Students_EndPoint);
            setFilteredStudents(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch students. Please try again later.');
            console.error('Error fetching students:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!selectedCourse && !selectedSemester) {
            await fetchAllStudents();
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(Get_Students_By_Course_Semester_EndPoint, {
                params: {
                    course: selectedCourse,
                    semester: selectedSemester
                }
            });
            setFilteredStudents(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to filter students. Please try again later.');
            console.error('Error filtering students:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const studentsToDisplay = filteredStudents || [];

    return (
        <AdminTemplate pageName='Student Details'>
            <div className="p-6 bg-[#000000] min-h-screen text-white relative">
                <div className="flex gap-4 mb-8">
                    <div className="relative w-64">
                        <div 
                            className="w-full p-2.5 bg-[#1C1C1C] rounded flex justify-between items-center cursor-pointer"
                            onClick={() => setShowDropdown(prev => ({ ...prev, course: !prev.course }))}
                        >
                            <span>{selectedCourse || 'Select Course'}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {showDropdown.course && (
                            <div className="absolute w-full mt-1 bg-[#1C1C1C] rounded shadow-lg z-10">
                                {courses.map((course) => (
                                    <div
                                        key={course}
                                        className="p-2 hover:bg-[#2D2D2D] cursor-pointer"
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setShowDropdown(prev => ({ ...prev, course: false }));
                                        }}
                                    >
                                        {course}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative w-64">
                        <div 
                            className="w-full p-2.5 bg-[#1C1C1C] rounded flex justify-between items-center cursor-pointer"
                            onClick={() => setShowDropdown(prev => ({ ...prev, semester: !prev.semester }))}
                        >
                            <span>{selectedSemester || 'Select Semester'}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {showDropdown.semester && (
                            <div className="absolute w-full mt-1 bg-[#1C1C1C] rounded shadow-lg z-10">
                                {semesters.map((semester) => (
                                    <div
                                        key={semester}
                                        className="p-2 hover:bg-[#2D2D2D] cursor-pointer"
                                        onClick={() => {
                                            setSelectedSemester(semester);
                                            setShowDropdown(prev => ({ ...prev, semester: false }));
                                        }}
                                    >
                                        {semester}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button 
                        className="px-6 py-2.5 bg-[#1C1C1C] rounded hover:bg-[#2D2D2D]"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Search'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500 text-white p-4 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[#FFFFFF]">
                                <th className="p-4">S.no</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Student Id</th>
                                <th className="p-4">Mobile Number</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : studentsToDisplay.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">No students found</td>
                                </tr>
                            ) : (
                                studentsToDisplay.map((student, index) => (
                                    <tr key={student.id} className="border-b text-center text-sm text-[#FFFFFFA6] border-[#1E1E1E] bg-[#1C1C1C]">
                                        <td className="px-4 py-3 border border-l-0 border-[#2D2D2D]">{index + 1}</td>
                                        <td className="px-4 py-3 border border-[#2D2D2D]">{student.name}</td>
                                        <td className="px-4 py-3 border border-[#2D2D2D]">{student.studentId}</td>
                                        <td className="px-4 py-3 border border-[#2D2D2D]">{student.mobileNumber}</td>
                                        <td className="px-4 py-3 border border-[#2D2D2D] border-r-0">
                                            <button
                                                className="px-4 py-1 bg-[#322F2F] text-white rounded hover:bg-[#2D2D2D]"
                                                onClick={() => handleView(student)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    <button className="p-2 bg-[#1E1E1E] rounded hover:bg-[#2D2D2D]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="p-2 bg-[#1E1E1E] rounded hover:bg-[#2D2D2D]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {showModal && selectedStudent && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#1E1E1E] p-6 rounded-lg w-[500px] max-w-[90%]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Student Details</h2>
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-3 grid md:grid-cols-2 space-x-4">
                                <div>
                                    <label className="text-gray-400">Name:</label>
                                    <p>{selectedStudent.name}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400">Student ID:</label>
                                    <p>{selectedStudent.studentId}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400">Course:</label>
                                    <p>{selectedStudent.course}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400">Semester:</label>
                                    <p>{selectedStudent.semester}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400">Mobile Number:</label>
                                    <p>{selectedStudent.mobileNumber}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400">Email:</label>
                                    <p>{selectedStudent.email}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400">Department:</label>
                                    <p>{selectedStudent.department}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400">Address:</label>
                                    <p>{selectedStudent.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminTemplate>
    );
};

export default StudentDetailsPage;