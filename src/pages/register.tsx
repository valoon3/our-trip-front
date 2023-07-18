import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import InputGroup from '@/components/InputGroup';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const [errors, setErrors] = useState<any>({});

  let router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/user/signup', {
        email,
        password,
        name: username,
      });

      console.log(data.emailError);

      if (data.emailError) {
        setErrors(data);
      } else {
        await router.push('/login');
      }
    } catch (err: any) {
      console.log(err);
      setErrors(err.response.data || {});
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="flex flex-col items-center justify-center h-screen p-6 ">
          <div className="w-10/12 mx-auto md:w-96">
            <h1 className="mb-2 text-lg font-medium">회원가입</h1>
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
              <InputGroup
                placeholder={'name'}
                value={username}
                setValue={setUserName}
                error={errors.usernameError}
              />
              <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
                회원가입
              </button>
              <small>
                이미 가입하셨나요?
                <Link href="/login" className="ml-1 text-blue-500 uppercase">
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

export default Register;
