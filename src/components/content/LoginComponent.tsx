import AppLayout from '@/components/layout/AppLayout';

const LoginComponent = () => {

  return (
    <>
      <AppLayout>
        <div>
          <input type="text" />
          <input type="password" />
          <button>로그인</button>
        </div>
      </AppLayout>
    </>
  );
}

export default LoginComponent;