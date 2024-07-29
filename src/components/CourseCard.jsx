import React, { useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';

const CourseCard = ({ course }) => {
    const [showMore, setShowMore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState(0);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleBuyNow = () => {
        setAmount(course.price * 1.00);
        setIsModalOpen(true);
    };

    const handlePayWithStripe = () => {
        // Redirect to Stripe payment or handle Stripe payment logic
        console.log('Paying with Stripe');
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
            <div className="relative w-full h-48">
                <Image
                    src={course.image.url}
                    alt={course.image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                <p className="text-gray-400">
                    {showMore ? course.description : `${course.description.slice(0, 100)}...`}
                    <button onClick={toggleShowMore} className="text-blue-400 ml-2">
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                </p>
                <div className='flex justify-between items-center w-[98%] mx-auto'>
                    <p className="text-yellow-500 font-bold mt-4">{course.price}</p>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                        onClick={handleBuyNow}
                    >Buy Now</button>
                </div>
            </div>
            {/* Modal Component */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPayWithStripe={handlePayWithStripe}
                amount={amount}
            />
        </div>
    );
};

export default CourseCard;
