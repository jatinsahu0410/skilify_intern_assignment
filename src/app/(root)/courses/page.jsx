'use client';

import React, { useState, useEffect } from 'react';
import CourseList from '@/components/CourseList';
import { filterData, courseData } from '@/data/data';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config'; 
import toast from 'react-hot-toast';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredCourses(Object.values(courseData).flat());
        } else {
            setFilteredCourses(courseData[selectedCategory] || []);
        }
    }, [selectedCategory]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logout was successful");
            router.push('/'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <nav className="bg-gray-800 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Top Courses</h1>
                <div className="flex justify-center">
                    <div className="flex space-x-4">
                        {filterData.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedCategory(filter.title)}
                                className={`py-2 px-4 rounded-lg ${selectedCategory === filter.title
                                        ? 'bg-blue-600'
                                        : 'bg-gray-800 hover:bg-gray-700 hover:border-white hover:border-[1px]'
                                    }`}
                            >
                                {filter.title}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </nav>

            <div className="container mx-auto p-4">
                <CourseList courses={filteredCourses} />
            </div>
        </div>
    );
};

export default Home;
