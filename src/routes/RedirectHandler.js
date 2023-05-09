import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHandler = () => {
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  console.log(code);

  useEffect(() => {
    try {
      const response = axios.post("your url address", code);

      console.log(response.data);
      localStorage.setItem("name", response.data.user_name);
      navigate("/Home");
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      code: {code}
      로그인중입니다.
    </div>
  );
};

export default RedirectHandler;
