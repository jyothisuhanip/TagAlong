
import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [passwordSpan, setPasswordSpan] = useState('');
  const [formspan, setFormSpan] = useState('');
  const [emailspan, setEmailSpan] = useState('');
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/login/guest');
  }

  const onFocusHandle = (e) => {
    setFormSpan('');
  }

  const validatePassword = (e) => {
    let passwordText = e.target.value;
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(e.type == "focus") {
      onFocusHandle();
      setPasswordSpan('')
    } else if(e.type == "blur") {
      if(passwordText.match(decimal)) {
        setPasswordSpan('');
      } else {
        setPasswordSpan('Your password must contain 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
      }
    }
  }

  const validateEmail = (e) => {
    var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;
    let emailText = e.target.value;
    if(e.type == "focus") {
      onFocusHandle();
      setEmailSpan('')
    } else if(e.type == "blur") {
      if (emailText.length > 0) {
        if (emailText.match(emailregex)) {
          setEmailSpan('')
        } else {
          setEmailSpan('The email should be a valid email address (abc@def.xyz).')
        }
      } else {
        setEmailSpan('The email should be a valid email address (abc@def.xyz).')
      }
    }
  }

  const handleRegister = (e) => {
      e.preventDefault();

      if((e.target.name.value && e.target.email.value && e.target.password.value && 
        e.target.phonenumber.value 
        && e.target.street.value && e.target.city.value && e.target.country.value && e.target.inlineRadioOptions.value && e.target.zipcode.value)) {
        fetch("http://localhost:9000/users/register", {
          method: "POST",
          body: JSON.stringify({
            username: e.target.name.value,
            email_: e.target.email.value,
            password_: e.target.password.value,
            phonenumber: e.target.phonenumber.value,
            street: e.target.street.value,
            city: e.target.city.value,
            country: e.target.country.value,
            sex: e.target.inlineRadioOptions.value,
            zipcode: e.target.zipcode.value
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
            return response.json()
            
          })
          .then((data) => {
            if(data.error) {
              setFormSpan(data.error);
            } else {
              handleNavigation();
            }
          })
          .catch(console.log);
      } else {
        setFormSpan("All fields are required");
      }
    }

  return (
    <section class="vh-100">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style={{"border-radius": "15px"}}>
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                  <form onSubmit={handleRegister}>

                    <div class="form-outline mb-4">
                      <input type="text" id="form3Example1cg" placeholder = "Your Name" name="name" class="form-control form-control-lg" onFocus={onFocusHandle} />
    
                    </div>

                    <div class="form-outline mb-4">
                      <input type="email" id="form3Example3cg" placeholder = "Your Email Address" name="email" class="form-control form-control-lg"  onFocus={validateEmail} onBlur={validateEmail} />
                      <span style={{color: "red"}}>{emailspan}</span>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" id="form3Example4cg" placeholder="Enter Password" name="password" class="form-control form-control-lg" onFocus={validatePassword} onBlur={validatePassword}/>
                      <span style={{color: "red"}}>{passwordSpan}</span>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="tel" id="phoneNumber" placeholder = "Enter Phone Number" name="phonenumber" class="form-control form-control-lg" onFocus={onFocusHandle} />
                    </div>

                    <div class="form-outline mb-4 py-2" onFocus={onFocusHandle}>

                      <h6 class="mb-0 me-4">Gender: </h6>

                      <div class="form-check form-check-inline mb-0 me-4">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                          value="F" />
                        <label class="form-check-label" for="femaleGender">Female</label>
                      </div>

                      <div class="form-check form-check-inline mb-0 me-4">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                          value="option2" />
                        <label class="form-check-label" for="M">Male</label>
                      </div>

                      <div class="form-check form-check-inline mb-0 me-4">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                          value="option3" />
                        <label class="form-check-label" for="O">Other</label>
                      </div>

                    </div>

                    <div class="mb-4 pb-2">
                    <div class="form-outline form-white">
                      <input type="text" id="form3Examplea2" placeholder="Enter your Address" name = "street" class="form-control form-control-lg" onFocus={onFocusHandle} />
                    </div>
                  </div>

                  <div class="mb-4 pb-2">
                    <div class="form-outline form-white">
                      <input type="text" id="form3Examplea3" placeholder="City" name="city" class="form-control form-control-lg" onFocus={onFocusHandle}/>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-5 mb-4 pb-2">

                      <div class="form-outline form-white">
                        <input type="text" id="form3Examplea4" placeholder="Zip Code" name="zipcode" class="form-control form-control-lg" onFocus={onFocusHandle}/>
                      </div>

                    </div>
                    <div class="col-md-7 mb-4 pb-2">

                      <div class="form-outline form-white">
                        <input type="text" id="form3Examplea5" placeholder="Country" name="country" class="form-control form-control-lg" onFocus={onFocusHandle} />

                      </div>

                    </div>
                  </div>

                    <div class="form-outline mb-4"><span style={{color: "red"}}>{formspan}</span></div>
                    <div class="d-flex justify-content-center mt-4">
                      <button type="submit"
                        class="btn btn-success btn-lg propertyButtons">Register</button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">Already have an account? <a href="#!"
                      class="fw-bold text-body"><Link to = "/login/guest"><u>Login here</u></Link></a></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
