import { useState, useEffect, useCallback } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import axios from 'axios';
import { Get_All_Students_EndPoint, Get_Students_By_Course_Semester_EndPoint } from '../../utils/constants';

const StudentDetailsPage = () => {
    // Pagination and filtering state
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    
    // Data and UI state
    const [filters, setFilters] = useState({
        course: '',
        semester: ''
    });
    const [students, setStudents] = useState([]);
    const [showDropdown, setShowDropdown] = useState({ course: false, semester: false });
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sample data
    const courses = ['BCA', 'MCA', 'BTech', 'MTech'];
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

    // Memoized fetch function to prevent unnecessary re-renders
    const fetchStudents = useCallback(async (pageNum = pagination.page) => {
        try {
            setLoading(true);
            setError(null);

            const endpoint = filters.course || filters.semester 
                ? Get_Students_By_Course_Semester_EndPoint 
                : Get_All_Students_EndPoint;

            const params = {
                page: pageNum,
                limit: pagination.limit,
                ...(filters.course && { course: filters.course }),
                ...(filters.semester && { semester: filters.semester })
            };

            const response = await axios.get(endpoint, { params });
            
            // Update state with new data
            setStudents(response.data.students);
            setPagination(prev => ({
                ...prev,
                page: pageNum,
                total: response.data.total,
                totalPages: Math.ceil(response.data.total / prev.limit)
            }));

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch students';
            setError({
                message: `${errorMessage}. Please try again later.`,
                code: err.response?.status,
                details: err.message
            });
            console.error('Error fetching students:', {
                error: err,
                filters,
                pagination: { page: pageNum, limit: pagination.limit },
                timestamp: new Date().toISOString()
            });
        } finally {
            setLoading(false);
        }
    }, [filters, pagination.limit, pagination.page]);

    // Initial load and page changes
    useEffect(() => {
        fetchStudents();
  
    }, [fetchStudents]);

    // Handle filter changes
    const handleFilterChange = (type, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, [type]: value };
            // Reset page when filters change
            setPagination(prev => ({ ...prev, page: 1 }));
            // Fetch data immediately when filter is selected
            fetchStudents(1);
            return newFilters;
        });
        setShowDropdown(prev => ({ ...prev, [type]: false }));
    };

    // Handle filter reset
    const handleClearFilters = () => {
        setFilters({ course: '', semester: '' });
        setPagination(prev => ({ ...prev, page: 1 }));
        // Fetch all students when filters are cleared
        fetchStudents(1);
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages && !loading) {
            fetchStudents(newPage);
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    return (
        <AdminTemplate pageName='Student Details'>
            <div className="p-6 bg-[#000000] min-h-screen text-white relative">
                {/* Filters */}
                <div className="flex gap-4 mb-8">
                    {/* Course Dropdown */}
                    <div className="relative w-64">
                        <div 
                            className="w-full p-2.5 bg-[#1C1C1C] rounded flex justify-between items-center cursor-pointer"
                            onClick={() => setShowDropdown(prev => ({ ...prev, course: !prev.course }))}
                        >
                            <span>{filters.course || 'Select Course'}</span>
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
                                        onClick={() => handleFilterChange('course', course)}
                                    >
                                        {course}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Semester Dropdown */}
                    <div className="relative w-64">
                        <div 
                            className="w-full p-2.5 bg-[#1C1C1C] rounded flex justify-between items-center cursor-pointer"
                            onClick={() => setShowDropdown(prev => ({ ...prev, semester: !prev.semester }))}
                        >
                            <span>{filters.semester || 'Select Semester'}</span>
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
                                        onClick={() => handleFilterChange('semester', semester)}
                                    >
                                        {semester}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dynamic Button */}
                    <button 
                        className="px-4 py-2.5 bg-[#1C1C1C] rounded hover:bg-[#2D2D2D] disabled:opacity-50"
                        onClick={filters.course || filters.semester ? handleClearFilters : () => fetchStudents(1)}
                        disabled={loading}
                    >
                        {filters.course || filters.semester ? 'Clear Filter' : 'Search'}
                    </button>
                </div>

                {/* Filter Status */}
                <div className="mb-4 text-sm text-gray-400 flex justify-between items-center">
                    <div>
                        {!filters.course && !filters.semester 
                            ? 'Showing all students' 
                            : `Filtered by: ${[
                                filters.course && `Course: ${filters.course}`,
                                filters.semester && `Semester: ${filters.semester}`
                            ].filter(Boolean).join(', ')}`
                        }
                    </div>
                    <div>
                        Total: {pagination.total} students
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500 text-white p-4 rounded mb-4 relative">
                        <button 
                            onClick={() => setError(null)}
                            className="absolute top-2 right-2 text-white hover:text-gray-200"
                        >
                            ×
                        </button>
                        <div className="font-bold">{error.message}</div>
                        {error.code && (
                            <div className="text-sm mt-1">Error Code: {error.code}</div>
                        )}
                        <button 
                            onClick={() => fetchStudents(pagination.page)}
                            className="mt-2 bg-white text-red-500 px-4 py-1 rounded text-sm hover:bg-red-100"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Students Table */}
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
                                    <td colSpan="5" className="text-center py-8">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                            <span className="ml-2">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8">
                                        <div className="text-gray-400">
                                            No students found
                                            {(filters.course || filters.semester) && (
                                                <div className="mt-2">
                                                    <button 
                                                        onClick={handleClearFilters}
                                                        className="text-white underline"
                                                    >
                                                        Clear filters
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                students.map((student, index) => (
                                    <tr key={student.id} className="border-b text-center text-sm text-[#FFFFFFA6] border-[#1E1E1E] bg-[#1C1C1C]">
                                        <td className="px-4 py-3 border border-l-0 border-[#2D2D2D]">
                                            {((pagination.page - 1) * pagination.limit) + index + 1}
                                        </td>
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

                {/* Pagination */}
                {!loading && students.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-400">
                            Page {pagination.page} of {pagination.totalPages}
                        </div>
                        <div className="flex gap-2">
                            <button 
                                className="p-2 bg-[#1E1E1E] rounded hover:bg-[#2D2D2D] disabled:opacity-50"
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1 || loading}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                className="p-2 bg-[#1E1E1E] rounded hover:bg-[#2D2D2D] disabled:opacity-50"
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages || loading}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Student Details Modal */}
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
                            <div className="space-y-3 grid md:grid-cols-2 gap-4">
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