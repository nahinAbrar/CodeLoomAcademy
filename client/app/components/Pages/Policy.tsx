import { styles } from '@/app/styles/style'
import React from 'react'

type Props = {}

const Policy = (props: Props) => {
    return (
        <div>
            <div className={"w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"}>
                <h1 className={`${styles.title} !text-start pt-2`}>
                    Terms & Conditons
                </h1>
                <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        Welcome to CodeLoom! By accessing and using our website, courses, and community resources, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before engaging with our content and services.
                    </p>
                    <br />
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        All materials provided on the CodeLoom platform, including but not limited to videos, courses, articles, and other resources, are for your personal and non-commercial use. You may not reproduce, distribute, or otherwise exploit any of the content without our explicit written permission.
                    </p>

                    <br />
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        By enrolling in our courses, you agree to pay the fees associated with the course. All payments are non-refundable, except in circumstances where CodeLoom deems a refund necessary due to a fault or error on our part.
                    </p>

                    <br />
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        CodeLoom is a community built on mutual respect and support. We expect all members to interact with kindness and professionalism. Any form of harassment, discrimination, or abusive behavior will not be tolerated and may result in removal from our platform
                    </p>

                    <br />
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        All content and materials available on CodeLoom, including the website design, text, graphics, logos, and course content, are the intellectual property of CodeLoom and are protected by applicable copyright and trademark laws.
                    </p>

                    <br />
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        CodeLoom is not liable for any damages or losses that may arise from your use of our platform, including but not limited to technical issues, errors in content, or unauthorized access to your personal information.
                    </p>

                    <br />
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        CodeLoom reserves the right to update or modify these terms and conditions at any time without prior notice. It is your responsibility to review these terms regularly to ensure you are aware of any changes.
                    </p>

                    <br />
                    <p className='py-2 ml[-15px] text-[16px] font-serif leading-8 whitespace-pre-line'>
                        By continuing to use our services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                    </p>


                </ul>
            </div>

        </div>
    )
}

export default Policy