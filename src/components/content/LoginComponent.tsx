import AppLayout from '@/components/layout/AppLayout';
import axios from 'axios';

// TODO : 사용하지 않는 경우 삭제하기
const LoginComponent = () => {

  const userInfo = { userEmail: 'asdf', password: '1234', name: '나병호' };

  const onClick = () => {
    console.log('로그인');
    axios.post('user/login', userInfo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AppLayout>
        <div>
          <input type='text' />
          <input type='password' />
          <button onClick={onClick}>로그인</button>
        </div>
      </AppLayout>
    </>
  );
};

export default LoginComponent;