import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CategoryDropdown( {categoryname} ) {
    return (
        <a class="dropdown-item" href="#">categoryname</a>
    );
}

export default function AddProperty({ criteria, editProperty }) {

    const navigate = useNavigate();

    const [formspan, setFormSpan] = useState();

    var categoryName = "";
    var propertyDetail = {
        title: "", locationDetail: "", description: "", fullDescription: "", nightlyfee: "", cleaningfee: "", servicefee: "",
        amenities: [], bedrooms: "", bathrooms: "", checkIn: "", checkOut: "", categoryName: ""
    }

    const [property, setProperty] = useState(propertyDetail);

    useEffect(() => {
        if (editProperty) {
            fetch("http://localhost:9000/properties?id=" + editProperty)
                .then((res) => { return res.json() })
                .then((data) => {
                    propertyDetail = data[0];
                    propertyDetail.categoryName = "National Park";
                    propertyDetail.checkIn = new Date(propertyDetail.checkIn).getFullYear() + '-' + (parseInt(new Date(propertyDetail.checkIn).getMonth()) + 1).toString() + '-' + new Date(propertyDetail.checkIn).getDate()
                    propertyDetail.checkOut = new Date(propertyDetail.checkOut).getFullYear() + '-' + (parseInt(new Date(propertyDetail.checkIn).getMonth()) + 1).toString() + '-' + new Date(propertyDetail.checkOut).getDate()
                    setProperty(propertyDetail);
                    console.log(propertyDetail);
                    // categoryName = "National Park"
                }).catch(console.log)

            // fetch('http://localhost:9000/categories')
            //     .then(res => res.json())
            //     .then((data) => {
            //         setCategories(data);
            //     })
            //     .catch(console.log)
        }
    })

    // categories.forEach((category) => {
    //     category_list.push(<CategoryDropdown categoryname={category.name}/>)
    // })

    var buttonText = "Add";
    if (criteria == "host-edit") {
        buttonText = "Edit";
    }

    const handleAddButton = (e) => {
        const localstorage_user = JSON.parse(localStorage.getItem('user'));

        e.preventDefault();
        let amenitiesList = e.target.amenities.value;
        let amenities = amenitiesList.split(',');
        let description = e.target.location.value;
        let imageFilePath = e.target.filefield.files[0];
        let locationDetail = e.target.shortDesc.value;
        let title = e.target.title.value;
        let fullDescription = e.target.fullDesc.value;
        let checkInValue = e.target.checkIn.value;
        let checkOutValue = e.target.checkOut.value;
        let cleaningfee = e.target.cleaningfee.value;
        let nightlyfee = e.target.nightlyfee.value;
        let servicefee = e.target.servicefee.value;
        let bedrooms = e.target.bedrooms.value;
        let bathrooms = e.target.bathrooms.value;
        let checkIn = new Date(checkInValue);
        let checkOut = new Date(checkOutValue);
        let hostId = localstorage_user.userId;

        var data = new FormData()
        data.append('imageFilePath', imageFilePath)
        data.append('description', description)
        data.append('hostId', hostId)
        data.append('title', title)
        data.append('locationDetail', locationDetail)
        data.append('fullDescription', fullDescription)
        data.append('checkIn', checkIn)
        data.append('checkOut', checkOut)
        data.append('cleaningfee', cleaningfee)
        data.append('nightlyfee', nightlyfee)
        data.append('servicefee', servicefee)
        data.append('bedrooms', bedrooms)
        data.append('bathrooms', bathrooms)
        let imagePath = JSON.stringify(imageFilePath)
        let property_ = { amenities, imagePath, description, hostId, title, locationDetail, fullDescription, checkIn, checkOut, cleaningfee, nightlyfee, servicefee, bedrooms, bathrooms }

        if (buttonText == "Add") {


            if (!(description && locationDetail && title && fullDescription && checkInValue && checkOutValue && cleaningfee && nightlyfee && servicefee && bedrooms && bathrooms)) {
                setFormSpan('All fields Required');
            } else {
                fetch("http://localhost:9000/properties", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localstorage_user.token
                    },
                    body: JSON.stringify(property_)
                }).then((res) => res.json())
                    .then((data) => {
                        navigate('/host/' + localstorage_user.userId);
                    }).catch(console.log)
            }
        } else {
            console.log(JSON.stringify(property_));
            if (editProperty) {
                fetch('http://localhost:9000/properties?id=' + editProperty, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(property_)
                }).then((res) => { return res.json() })
                    .then((data) => {
                        // console.log(data);
                        navigate('/host/' + localstorage_user.userId);
                    })
            }
        }
    }

    return (
        <div class="col px-5 py-2">
            <div class="mask d-flex align-items-center gradient-custom-3">
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-md-9 col-lg-7 col-xl-9">
                            <div class="card" style={{ "border-radius": "15px" }}>
                                <div class="card-body justify-content-center">
                                    <h2 class="text-uppercase text-center mb-5">{buttonText} a Property</h2>

                                    <form enctype="multipart/form-data" onSubmit={handleAddButton} class="justify-center" id="form-add">

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Location:</h6>  </label>
                                            <input type="text" id="form3Example3cg" placeholder='Enter Location' name="location" class="form-control" defaultValue={property.locationDetail} />


                                        </div>


                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Title:</h6>  </label>
                                            <input type="text" class="form-control" name='title' placeholder="Enter your Property Title" defaultValue={property.title} />

                                        </div>

                                        <div class="form-outline form-check-inline mb-2 mr-0">
                                            <label class="mr-3"><h6>Short Description: </h6>  </label>
                                            <input type="text" class="form-control mr-0" name='shortDesc' placeholder="Enter Short Description" defaultValue={property.description} />

                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Full Description: </h6>  </label>
                                            <input type="text" class="form-control" name='fullDesc' placeholder="Enter full description to property" defaultValue={property.fullDescription} />
                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Available Start Date: </h6>  </label>
                                            <input class="form-control" type="date" name="checkIn" defaultValue={property.checkIn} required />

                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Available End Date: </h6>  </label>
                                            <input class="form-control" type="date" name="checkOut" defaultValue={property.checkOut}
                                                required />
                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Cleaning fee: </h6>  </label>
                                            <input type="text" class="form-control" name='cleaningfee' defaultValue={property.cleaningfee} placeholder="Enter cleaning fee" />
                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Service Fee: </h6>  </label>
                                            <input type="text" class="form-control" name='servicefee' defaultValue={property.servicefee} placeholder="Enter service fee" />
                                        </div>


                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Nightly Fee: </h6>  </label>
                                            <input type="text" class="form-control" name='nightlyfee' defaultValue={property.nightlyfee} placeholder="Enter nightly fee" />
                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Amenities: </h6>  </label>
                                            <input type="text" class="form-control" name='amenities' defaultValue={property.amenities} placeholder="Enter your amenities" />
                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>No. of bedrooms</h6>  </label>
                                            <input type="text" class="form-control" name='bedrooms' defaultValue={property.bedrooms} placeholder="Enter no. of bathrooms" />
                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>No. of bathrooms</h6>  </label>
                                            <input type="text" class="form-control" name='bathrooms' defaultValue={property.bathrooms} placeholder="Enter no. of bedrooms" />
                                        </div>

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Category: </h6>  </label>
                                            <input type="text" class="form-control" name='category' defaultValue={property.categoryName} placeholder="Enter Category" />
                                        </div>

                                        

                                        <div class="form-outline form-check-inline mb-2">
                                            <label class="mr-3"><h6>Upload Images</h6>  </label>
                                            <input type="file" name="filefield" />
                                        </div>


                                        <div class="form-outline mb-4"><span style={{ color: "red" }}>{formspan}</span></div>
                                        <div class="d-flex justify-content-center mt-4">
                                            <button type="submit"
                                                class="propertyButtons favButton rounded-corners">{buttonText}</button>
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
