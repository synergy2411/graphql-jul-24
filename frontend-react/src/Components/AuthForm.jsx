import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import USER_LOGIN from "../apollo/user-login";

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const [onUserLogin] = useMutation(USER_LOGIN);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await onUserLogin({
      variables: {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      },
    });
    localStorage.setItem("token", data.signIn.token);
    navigate("/posts");
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <div className="card">
          <div className="card-body">
            <form onSubmit={submitHandler}>
              {/* email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=""
                  ref={emailInputRef}
                />
                <label htmlFor="email">Email</label>
              </div>

              {/* password */}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder=""
                  ref={passwordInputRef}
                />
                <label htmlFor="password">Password</label>
              </div>

              {/* button */}
              <div className="row">
                <div className="col-6">
                  <div className="d-grid">
                    <button className="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
