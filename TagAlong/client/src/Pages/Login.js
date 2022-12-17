import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formspan, setFormSpan] = useState('');
  const handleNavigation = () => {
    navigate('/');
  }
  const handleClick = (e) => {
    // navigate('/');
    e.preventDefault();
    fetch("http://localhost:9000/users/login", {
      method: "POST",
      body: JSON.stringify({
        email_: e.target.email.value,
        password_: e.target.password.value
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.error) {
          setFormSpan(data.error);
          e.target.reset();
        } else {
          localStorage.setItem('user', JSON.stringify(data));
          handleNavigation(); 
        }
      });
  };

  const onFocusHandle = (e) => {
    setFormSpan('');
  }

  return(
    <section class="vh-100">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style={{"border-radius": "15px"}}>
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-5">Login to your Account</h2>

                <form onSubmit={handleClick}>

                  <div class="form-outline mb-4">
                    <input type="email" id="form3Example3cg" placeholder = "Your Email Address" name="email" class="form-control form-control-lg" onFocus={onFocusHandle}/>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form3Example4cg" placeholder="Enter Password" name="password" class="form-control form-control-lg" onFocus={onFocusHandle}/>
                  </div>

                  <div class="form-outline mb-4"><span style={{color: "red"}}>{formspan}</span></div>

                  <div class="d-flex justify-content-center mt-4">
                    <button type="submit"
                      class="btn btn-success btn-lg propertyButtons">Login</button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">Not a user yet? <a href="#!"
                    class="fw-bold text-body"><Link to = "/signup/guest"><u>Signup here</u></Link></a></p>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );

  return (
    <div>
      <div
        className="card shadow-8-strong"
        style={{
          marginTop: "20px",
          marginBottom: "50px",
          marginLeft: "450px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
          height: "320px",
          width: "450px",
          backgroundColor: "black",
        }}
      >
        <div className="card-body p-md-3">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2
                className="fw-bold mb-8"
                style={{ color: "white", marginTop: "10px" }}
              >
                Login
              </h2>
              <form>
                <div className="row">
                  <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                    <div className="form-outline">
                      <input
                        type="text"
                        placeholder="Email"
                        id="email"
                        className="form-control-lg"
                        style={{ width: "300px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                    <div className="form-outline">
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="form-control-lg"
                        style={{ width: "300px" }}
                      />
                    </div>
                  </div>
                </div>
          <Link to = "/">
                <button
                  id="add"
                  className="Add"
                  onClick={handleClick}
                  style={{
                    size: "15px",
                    fontSize: "13px",
                    fontWeight: "1000px",
                    letterSpacing: "1px",
                    padding: "13px 50px 13px",
                    border: "1px solid black",
                    position: "relative",
                    backgroundColor: "#66f2d5",
                  }}
                >
                  Login
                </button>
              </Link>
              <Link to = "/signup/guest">
                <button
                  id="add"
                  className="Add"
                  style={{
                    size: "15px",
                    fontSize: "13px",
                    fontWeight: "1000px",
                    letterSpacing: "1px",
                    padding: "13px 50px 13px",
                    border: "1px solid black",
                    position: "relative",
                    backgroundColor: "#66f2d5",
                  }}
                >
                  Sign Up
                </button>
              </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
