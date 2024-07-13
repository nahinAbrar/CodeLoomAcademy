import { useActivationMutation } from '@/redux/features/auth/authApi';
import { styles } from '../../../app/styles/style';
import React, { FC, useEffect, useRef, useState } from 'react'
import toast, { Toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { useSelector } from 'react-redux';


type Props = {
    setRoute: (route: string) => void;
}

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: FC<Props> = ({ setRoute }) => {

    const { token } = useSelector((state: any) => state.auth);
    const [activation, { isSuccess, error }] = useActivationMutation();

    const [invalidError, setInvalidError] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated Successfully");
            setRoute("Login");
        };
        if (error) {
            if ('data' in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
                setInvalidError(true);
            } else {
                console.log("An Error occurred", error);
            }
        }


    }, [isSuccess, error])


    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    })

    const verificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidError(true);
            return;
        }
        await activation({
            activation_token: token,
            activation_code: verificationNumber,
        })
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    return (
        <div>
            <h1 className={`${styles.title}`}>
                Verify Your Account
            </h1>
            <br />

            <div className='w-full flex items-center justify-center mt-2'>
                {/*ICON*/}
                <div className='w-[80px] h-[80px] rounded-full bg-blue-400 flex items-center justify-center'>
                    <VscWorkspaceTrusted size={40} className='dark:text-white' />
                </div>
            </div>
            <br /> <br />

            <div className='m-auto flex items-center justify-center'>
                {
                    Object.keys(verifyNumber).map((key, index) => (
                        <input
                            type='number'
                            key={key}
                            ref={inputRefs[index]}
                            placeholder=' '
                            aria-label='otp'
                            className={`w-[65px] h-[65px] m-2 bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Montserrat outline-none text-center ${invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"}`}
                            maxLength={1}
                            value={verifyNumber[key as keyof VerifyNumber]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))
                }
            </div>
            <br /> <br />
            {/*verify otp button*/}
            <div className='w-full flex justify-center'>
                <button
                    type='submit'
                    className={`${styles.button}`}
                    onClick={verificationHandler}
                >
                    Verify
                </button>
            </div>
            <br />
            <h5 className='text-center pt-4 font-Montserrat text-[14px] text-black dark:text-white'>
                Go Back to Login?
                <span
                    className='text-blue-300 pl-1 cursor-pointer'
                    onClick={() => setRoute("Login")}>
                    Login
                </span>
            </h5>

        </div>
    )
}

export default Verification