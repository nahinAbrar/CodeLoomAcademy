import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react'

type Props = {}

export const reviews = [
    {
        name: "John",
        avatar: "https://randomuser.me/api/portraits/men/30.jpg",
        profession: "Student || University of Chicago",
        comment: "Great!!"
    },
    {
        name: "Amina",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        profession: "Software Engineer || Google",
        comment: "Highly informative and well-structured course."
    },
    {
        name: "Siddharth",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        profession: "Data Scientist || IBM",
        comment: "Loved the practical examples and hands-on approach."
    },
    {
        name: "Priya",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        profession: "Marketing Specialist || HubSpot",
        comment: "Very engaging and easy to follow."
    },
    {
        name: "Rahul",
        avatar: "https://randomuser.me/api/portraits/men/60.jpg",
        profession: "Full Stack Developer || Amazon",
        comment: "The content was up-to-date and relevant."
    },
    {
        name: "Meera",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        profession: "Product Manager || Microsoft",
        comment: "This course really helped me in my career growth."
    },
    {
        name: "Ali",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        profession: "Graphic Designer || Freelancer",
        comment: "Creative and inspiring. Highly recommended!"
    },
    {
        name: "Nina",
        avatar: "https://randomuser.me/api/portraits/women/38.jpg",
        profession: "UX Designer || Adobe",
        comment: "A fantastic learning experience with great support."
    },
    {
        name: "Rohan",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        profession: "Backend Developer || Facebook",
        comment: "Excellent content, well explained."
    },
    {
        name: "Fatima",
        avatar: "https://randomuser.me/api/portraits/women/50.jpg",
        profession: "Entrepreneur || Tech Start-up",
        comment: "I gained so much value from this course."
    }
];


const Reviews = (props: Props) => {
    return (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
            <div className='w-full 800px:flex items-center'>
                <div className='800px:w-[50%] w-full'>
                    <Image
                        src={require("../../../public/assets/hero_2.png")}
                        height={700}
                        width={700}
                        alt='business'
                    />
                </div>
                <div className='800px:w-[50%] w-full'>
                    <h3 className={`${styles.title} 800px:!text-[35px] !text-start`}>
                        Our Students Are <span className='text-cyan-500'>Our Strength</span>{" "}
                        <br /> See What They Say About Us
                    </h3>
                    <br />
                    <p className={`${styles.label} font-sans italic`}>
                        "Our students are the heart of our institution. They consistently impress us with their achievements and dedication. From securing prestigious internships to conducting groundbreaking research, our students are making a real difference in the world. Don't just take our word for it: 'I've never felt so supported in my academic journey,' says John Doe, a Computer Science major. Our small class sizes, personalized attention from faculty, and emphasis on practical skills create an environment where students can thrive. Join our community and discover your full potential."
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Reviews