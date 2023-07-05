import InputGroup from '@/components/InputGroup';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/app/reduce/userSlice';

const Login = () => {
  let router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const loginToggle = useSelector((state: any) => state.user.loginToggle);
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      let response = await axios.post(
        '/user/signin',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // console.log(cookieStore.get('token'));
      // localStorage.setItem('token', response.data.access_token);
      //
      // console.log('token : ' + localStorage.getItem('token'));

      // setToggleLogin(true);

      console.log(loginToggle);
      console.log('로그인');
      dispatch(login());
      console.log(loginToggle);

      await router.push('/');
    } catch (err) {
      console.error(err);
      // setErrors(errors.response.data);
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
