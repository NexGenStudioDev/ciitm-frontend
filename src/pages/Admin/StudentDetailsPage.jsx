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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [retryCount, setRetryCount] = useState(0);
    const ITEMS_PER_PAGE = 10;

    // Sample data - replace with API calls later
    const courses = ['BCA', 'MCA', 'BTech', 'MTech'];
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

    useEffect(() => {
        fetchAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // Refetch when page changes

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
        setError(null);
        if (!selectedCourse && !selectedSemester) {
            fetchAllStudents();
        } else {
            handleSearch();
        }
    };

    const fetchAllStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(Get_All_Students_EndPoint, {
                params: {
                    page,
                    limit: ITEMS_PER_PAGE
                }
            });
            setFilteredStudents(response.data.students);
            setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
            setError(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch students';
            setError({
                message: `${errorMessage}. Please try again later.`,
                code: err.response?.status,
                details: err.message
            });
            // Log to monitoring service (e.g., Sentry)
            console.error('Error fetching students:', {
                error: err,
                retryCount,
                timestamp: new Date().toISOString()
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        // Reset to first page when searching
        setPage(1);

        if (!selectedCourse && !selectedSemester) {
            await fetchAllStudents();
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(Get_Students_By_Course_Semester_EndPoint, {
                params: {
                    course: selectedCourse,
                    semester: selectedSemester,
                    page,
                    limit: ITEMS_PER_PAGE
                }
            });
            setFilteredStudents(response.data.students);
            setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
            setError(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to filter students';
            setError({
                message: `${errorMessage}. Please try again later.`,
                code: err.response?.status,
                details: err.message
            });
            console.error('Error filtering students:', {
                error: err,
                filters: { course: selectedCourse, semester: selectedSemester },
                retryCount,
                timestamp: new Date().toISOString()
            });
        } finally {
            setLoading(false);
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
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
                        className="px-6 py-2.5 bg-[#1C1C1C] rounded hover:bg-[#2D2D2D] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Search'}
                    </button>

                    {(selectedCourse || selectedSemester) && (
                        <button 
                            className="px-4 py-2.5 bg-[#1C1C1C] rounded hover:bg-[#2D2D2D]"
                            onClick={() => {
                                setSelectedCourse('');
                                setSelectedSemester('');
                                fetchAllStudents();
                            }}
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Filter Status */}
                <div className="mb-4 text-sm text-gray-400">
                    {!selectedCourse && !selectedSemester ? (
                        'Showing all students'
                    ) : (
                        `Filtered by: ${[
                            selectedCourse && `Course: ${selectedCourse}`,
                            selectedSemester && `Semester: ${selectedSemester}`
                        ].filter(Boolean).join(', ')}`
                    )}
                </div>

                {error && (
                    <div className="bg-red-500 text-white p-4 rounded mb-4">
                        <div className="font-bold">{error.message}</div>
                        {error.code && (
                            <div className="text-sm mt-1">Error Code: {error.code}</div>
                        )}
                        <button 
                            onClick={handleRetry}
                            className="mt-2 bg-white text-red-500 px-4 py-1 rounded text-sm hover:bg-red-100"
                        >
                            Retry
                        </button>
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
                                    <td colSpan="5" className="text-center py-8">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                            <span className="ml-2">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : studentsToDisplay.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8">
                                        <div className="text-gray-400">
                                            No students found
                                            {(selectedCourse || selectedSemester) && (
                                                <div className="mt-2">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedCourse('');
                                                            setSelectedSemester('');
                                                            fetchAllStudents();
                                                        }}
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
                                studentsToDisplay.map((student, index) => (
                                    <tr key={student.id} className="border-b text-center text-sm text-[#FFFFFFA6] border-[#1E1E1E] bg-[#1C1C1C]">
                                        <td className="px-4 py-3 border border-l-0 border-[#2D2D2D]">
                                            {((page - 1) * ITEMS_PER_PAGE) + index + 1}
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
                {!loading && studentsToDisplay.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-400">
                            Page {page} of {totalPages}
                        </div>
                        <div className="flex gap-2">
                            <button 
                                className="p-2 bg-[#1E1E1E] rounded hover:bg-[#2D2D2D] disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1 || loading}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                className="p-2 bg-[#1E1E1E] rounded hover:bg-[#2D2D2D] disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages || loading}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

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