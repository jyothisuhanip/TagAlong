import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const StarRating = ({setRating, rating}) => {
    
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button 
              type="button" id="starRating"
              key={index}
              className={index <= (hover || rating) ? "on" : "off" }
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default function RateProperty({ propertyId_ }) {
    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const handleClick = (e) => {
        if (localstorage_user) {
            if(localstorage_user.userId) {
            e.preventDefault();//wrote this to prevent automatically submitting so that console error can be seen..can remove for integration
            fetch("http://localhost:9000/ratings", {
                method: "POST",

                body: JSON.stringify({
                    userId: localstorage_user.userId,
                    propertyId: propertyId_,//"state" here but as it is not linked so hard coded
                    ratings: rating,
                    feedback: document.getElementById("feedback").value,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
            })
                // Converting received data to JSON
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch(console.log);
        }
        } 
        else {
            navigate('/login/guest');
        }
    };

    return (
        <div
            className="card"
        >
            <div className="card-body">
                <div className="row d-flex justify-content-center">
                    <div className="col align-items-center">
                        <h2
                            
                            style={{ color: "black", marginTop: "10px", marginLeft: "5px" }}
                        >
                            Please Rate us and Give feedback
                        </h2>
                        <form id="myForm">
                            <div className="row">
                                <div
                                    className="mb-2 px-0"
                                    style={{ marginTop: "10px", marginLeft: "120px" }}
                                ><StarRating setRating={setRating} rating={rating}/>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div
                                    className="mb-4 px-0"
                                    style={{ marginTop: "10px", marginLeft: "25px" }}
                                >
                                    <div className="form-outline">
                                        <textarea
                                            id="feedback"
                                            className="form-control-lg"
                                            placeholder="Please enter feedback...."
                                            style={{ width: "500px", color: "black" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                id="add"
                                className="Add rounded-corners favButton propertyButtons"
                                onClick={handleClick}
                                style={{

                                    //   letterSpacing: "1px",
                                    padding: "13px 50px 13px",
                                    //   border: "1px solid black",
                                    position: "relative",
                                    backgroundColor: "#416bdf",
                                    color: "white",
                                    marginLeft: "150px"

                                }}
                            >
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
