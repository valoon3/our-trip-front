import AppLayout from '@/components/layout/AppLayout';

const SignUpComponent = () => {

  return (
    <>
      <AppLayout>
        <div>
          <input type="text" placeholder="아이디"/>
          <button>중복확인</button>
          <input type="password" placeholder="비밀번호"/>
          <input type="password" placeholder="비밀번호 확인"/>
          <button>회원가입</button>
        </div>
      </AppLayout>
    </>
  );
}

export default SignUpComponent;