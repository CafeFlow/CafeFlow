import axios from "axios";
import React, { useState } from "react";

import { useSetRecoilState } from "recoil";
import {
  tokenState,
  ageState,
  emailState,
  nicknameState,
} from "../../recoils/Recoil";
import { API_URL } from "../Constant";

import "./Login.css";
import { useNavigate } from "react-router-dom";

import logo from "../../icons/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const moveToRegister = () => {
    navigate("/register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setToken = useSetRecoilState(tokenState);
  const setAge = useSetRecoilState(ageState);
  const setEmail1 = useSetRecoilState(emailState);
  const setNickname = useSetRecoilState(nicknameState);
  const isFormFilled = email && password;

  const SatisfyPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!email) {
      alert("아이디가 입력되지 않았습니다!");
    } else if (!password) {
      alert("비밀번호가 입력되지 않았습니다!");
    } else {
      axios
        .post(`${API_URL}/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          const { jwtToken, email, age, nickname } = response.data;

          console.log(response.data);
          setToken(jwtToken);
          setAge(age);
          setEmail1(email);
          setNickname(nickname);

          localStorage.setItem("jwtToken", jwtToken);
          localStorage.setItem("email", email);
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("age", age);

          alert("로그인에 성공했습니다.");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response);
          alert("로그인에 실패했습니다.");
        });
    }
  };
  return (
    <div className="login-outer-container">
      <div className="login-inner-container">
        <img src={logo}></img>
        <h2>로그인</h2>
        <div className="button-container">
          <button className="naver"></button>
          <button className="kakao"></button>
          <button className="google"></button>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <div class="login-input-container">
          <label for="email" className="login-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="id"
            placeholder="Email을 입력하세요"
            className="input1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="login-input-container">
          <label for="password" className="login-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="input1"
            value={password}
            onChange={SatisfyPassword}
          />
          <p style={{ fontSize: "12px", color: "gray" }}>
            Password 조건을 적는 부분입니다.(특수문자 포함, 10자 이상)
          </p>
        </div>
        <button
          style={{ backgroundColor: isFormFilled ? "#564e97" : "#cecdd9" }}
          type="submit"
          className="submit-button"
          onClick={handleLogin}
        >
          로그인하기
        </button>
        <div>
          <p
            style={{
              margin: "0px",
              fontSize: "13px",
              color: "gray",
              marginTop: "20px",
            }}
          >
            계정이 없나요?
            <a href="/register" style={{ textDecoration: "underline" }}>
              회원가입하기
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
