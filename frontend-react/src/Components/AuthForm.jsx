import { useRef } from "react";

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Email : ", emailInputRef.current.value);
    console.log("Password : ", passwordInputRef.current.value);
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
