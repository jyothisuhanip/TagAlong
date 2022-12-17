import { useParams } from 'react-router-dom'; 
import Header from './Header';  
import Footer from './Footer';
import SideMenu from './SideMenu';
import Jumbotron from './Jumbotron';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import RateProperty from './RateProperty';

export default function PropertyDetail() {
    const [property_, setProperty] = useState([]);
    const {id} =  useParams();
   
    var path = "http://localhost:9000/properties?id=" + id;
    useEffect(() => {
        fetch(path)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                  }
                return res.json();
            })
            .then((data) => {  
                setProperty(data);
            })
            .catch((e) => {
                console.log("error"+e);
            })
    });

    

    if(property_ != undefined) {
    return (
        <div className="Detail">
            <Header/>
            <Jumbotron />
            <div class="container-fluid text-left">
                <div class="row align-items-sm-start">
                    <SideMenu />
                    <Details property = {property_[0]} />
                </div>
            </div>
            <Footer />
        </div>
    );
    }
    return (
        <div></div>
    );
    
}

function Details({ property }) {
    if(property != null) {
        return (
            <div class="col px-5 py-3">
                <div class="row">
                    <PropertyTitle property={property} />
                    <PropertyImageDetail property={property} />
                    <PropertyDetailedDesc property={property} />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
   
}


function PropertyTitle({ property }) {
    return (
        <div class="row h-100">
            <h2>{property.locationDetail}</h2>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                &nbsp;
                {property.rating}
                &nbsp;|&nbsp;
                <u>{property.review_count} reviews</u>
                &nbsp;|&nbsp;
                {property.title}
            </p>
        </div>
    );
}

function PropertyImageDetail({ property }) {
    const imageOne = "Assets/".concat(property.images[0]);
    const imageTwo = "Assets/".concat(property.images[1]);
    const imageThree = "Assets/".concat(property.images[2]);
    // console.log(imageOne);
    return (
        <div class="row">
            <div class="col-md-6 pt-4 pb-4 px-4 m-0 d-flex-column">
                <img src={imageOne} class="img-fluid mainImage" alt="Temple of Hephaistos" />
            </div>
            <div class="col-md-4 m-0 d-flex-column">
                <img src={imageTwo} class="img-fluid sideImage pt-4 pb-2" alt="SomeImage" />
                <img src={imageThree} class="img-fluid sideImage pt-2 pb-4" alt="SomeImage" />
            </div>
        </div>
    );
}

function PropertyDetailedDesc({ property }) {
    const amenitiesList = []
    const [availabilityText, setAvailabilityText] = useState('')
    const navigate = useNavigate();

    property.amenities.forEach((amenity_) => {
        amenitiesList.push(<PropertyAmenities amenity={amenity_} />);
    })

    const handleReservation = (event)=> {
        event.preventDefault();

        const checkIn = new Date(event.target.checkIn.value); // accessing directly
        const checkOut = new Date(event.target.checkOut.value);
        const propertyCheckIn = new Date(property.checkIn)
        const propertyCheckout = new Date(property.checkOut)
        if(property.availability == "Unavailable") {
            setAvailabilityText("Sorry this property is unavailable at the moment");
        } 
        else if(checkIn > propertyCheckout || checkIn < propertyCheckIn || checkOut < propertyCheckIn || checkOut > propertyCheckout) {
            console.log("checkIn"+checkOut);
            console.log("propertyCheckIn"+propertyCheckIn);
            console.log(checkOut < propertyCheckIn);
            setAvailabilityText("Sorry this property is unavailable at the specified dates");
        } 
        else {
            let reservation = {
                                reservationId: "" + Date.now(), 
                                propertyId: property.propertyId,  
                                checkIn:checkIn,
                                checkOut: checkOut,
                                paymentId: "" + Date.now(),
                                upcoming: true};
            const localstorage_user = JSON.parse(localStorage.getItem('user'));
            if(localstorage_user) {
                fetch('http://localhost:9000/reservations?userid=' + localstorage_user.userId, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-auth-token': localstorage_user.token
                    },
                    body: JSON.stringify(reservation)
                })
                    .then(res => res.json())
                    .then(() => {
                        setAvailabilityText("Congratulations, you have successfully reserved your moment!!");
                    })
                    .catch(console.log);

            } else {
                navigate('/login/guest');
            }
            
        }
        

        
    }

    return (
        <div class="row p-4">
            <div class="col-lg-6 px-2">
                <p>{property.guests} guests | {property.bedrooms} bed | {property.bathrooms} bath</p>
                <hr />
                <p><b>Self Check in</b></p>
                <p>Check yourself in with the lockbox.</p>
                <p><b>Great Location</b></p>
                <p>100% of recent guests gave the location a 5-star rating</p>
                <p>{property.full_description}</p>
                <hr />
                <h4>What this place offers</h4>
                <div class="container p-0">
                    {amenitiesList}
                </div>
                <hr />
                <div class="container p-0">
                <RateProperty propertyId_={property.propertyId} />
                </div>
                
                {/* <div class="row p-4"> */}
            </div>
            <div class="col-lg-5 ml-auto">
                <div id="booking" class="section">
                    <div class="section-center">
                        <div class="container">
                            <div class="row">
                                <div class="booking-form">
                                    <div class="form-header">
                                        <h3>Hold this Moment? </h3>
                                    </div>
                                    <form onSubmit={handleReservation}>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input class="form-control" type="date" name="checkIn" defaultValue={new Date(property.checkIn).getFullYear() + '-' + (parseInt(new Date(property.checkIn).getMonth()) + 1).toString() + '-' + new Date(property.checkIn).getDate()} required />
                                                    <span class="form-label">Check In</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input class="form-control" type="date" name="checkOut" defaultValue={new Date(property.checkOut).getFullYear() + '-' + (parseInt(new Date(property.checkOut).getMonth()) + 1).toString() + '-' + new Date(property.checkOut).getDate()} required />
                                                    <span class="form-label">Check out</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row p-2">
                                            <div class="col-md-4 m-0 p-0">
                                                <div class="form-group">
                                                    <select class="form-control" required>
                                                        <option defaultValue={property.bedrooms} selected hidden>no of rooms</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                    </select>

                                                </div>
                                            </div>
                                            <div class="col-md-4 m-0 p-0">
                                                <div class="form-group">
                                                    <select class="form-control" required>
                                                        <option defaultValue={property.guests} selected hidden>no of adults</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-4 m-0 p-0">
                                                <div class="form-group">
                                                    <select class="form-control" required>
                                                        <option defaultValue={property.guests} selected hidden>no of children</option>
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p><u>Cleaning Fees:</u></p>
                                                    </div>
                                                    <div class="col-md-6 sm-1 text-right">
                                                        <p> ${property.cleaningfee} </p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p><u>Nightly Fees:</u></p>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        <p> ${property.nightlyfee} </p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p><u>Service Fees:</u></p>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        <p> ${property.servicefee} </p>
                                                    </div>
                                                </div>
                                                <div class="form-btn">
                                                    <input type="submit" value="Reserve" class="btn btn-primary booking-form submit-btn "/>
                                                </div>
                                                <div style={{color: "red"}}>
                                                    <p> {availabilityText} </p>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

function PropertyAmenities({ amenity }) {
    return (
        <div>
            <h6>{amenity}</h6>
        </div>
    );
}