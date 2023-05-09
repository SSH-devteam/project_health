function Login() {
  const REST_API_KEY = "ad8e3d2f4969f73b91ad1b8bbba82384";
  const REDIRECT_URI = "http://localhost:3000/kakao-callback";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button type="button" onClick={loginHandler}>
      카카오 로그인
    </button>
  );
}

export default Login;
