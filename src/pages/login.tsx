import InputGroup from '@/components/InputGroup';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@/app/reduce/userSlice';

const Login = () => {
  let router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    emailError?: string;
    passwordError?: string;
  }>({});

  const test = useSelector((state: any) => state.user);
  const { loginToggle, userInfo } = test;
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      let res = await axios.post('/user/signin', {
        email,
        password,
      });

      console.log(res);

      if (!res.data.loginError) {
        console.log('로그인');
        // localStorage.setItem('loginInfo', 'true');
        // dispatch(login());
        dispatch(
          setUserInfo({
            name: res.data.name,
            email: res.data.email,
          })
        );
        return await router.push('/');
      }
    } catch (err: any) {
      const error = err.response.data.error;

      const errorObject: { emailError?: string; passwordError?: string } = {};
      Object.keys(error).forEach((key: string) => {
        if (key === 'emailError' || key === 'passwordError')
          errorObject[`${key}`] = error[key];
      });
      setErrors(errorObject);
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="flex flex-col items-center justify-center h-screen p-6 ">
          <div className="w-10/12 mx-auto md:w-96">
            <h1 className="mb-2 text-lg font-medium">로그인</h1>
            <form onSubmit={handleSubmit}>
              <InputGroup
                placeholder={'Email'}
                value={email}
                setValue={setEmail}
                error={errors.emailError}
              />
              <InputGroup
                type={'password'}
                placeholder={'Password'}
                value={password}
                setValue={setPassword}
                error={errors.passwordError}
              />
              <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
                로그인
              </button>
              <small>
                아직 아이디가 없나요?
                <Link href="/register" className="ml-1 text-blue-500 uppercase">
                  로그인
                </Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
