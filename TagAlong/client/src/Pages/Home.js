import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Jumbotron from './Jumbotron';
import SideMenu from './SideMenu';
import AddProperty from './AddProperty';
import { Link, useParams, useNavigate } from 'react-router-dom';
// ...


export default function Home({ criteria }) {
    const [properties, setProperties] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [categories, setCategories] = useState([]);
    let {id} =  useParams();
    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (localstorage_user && criteria) {
            var path = "http://localhost:9000/users?id=" + localstorage_user.userId;
            if (criteria == "favorites" && id) {
                fetch(path)
                    .then(res => {
                        return res.json()
                    })
                    .then((data) => {
                        setProperties(data);
                    })
                    .catch(console.log)
            } else if (criteria == "reservations" && id) {
                fetch('http://localhost:9000/reservations?userid=' + localstorage_user.userId)
                    .then(res => {
                        return res.json()
                    })
                    .then((data) => {
                        setProperties(data);
                    })
                    .catch(console.log)
            } else if(criteria == "host") {
                fetch('http://localhost:9000/properties?hostId=' + localstorage_user.userId)
                    .then(res => {
                        return res.json()
                    })
                    .then((data) => {
                        setProperties(data);
                    })
                    .catch(console.log)
            } else if(criteria == "host-add" || criteria == "host-edit") {
                // setProperties(null);
            }
        } else {
            fetch('http://localhost:9000/properties')
                .then(res => res.json())
                .then((data) => {
                    setProperties(data);
                })
                .catch(console.log)

            fetch('http://localhost:9000/categories')
                .then(res => res.json())
                .then((data) => {
                    setCategories(data);
                })
                .catch(console.log)
        }
    });
    
    if (criteria == "host" || criteria == "host-add" || criteria == "host-edit") {
        return (
            <div className="Home">
                <Header filterText={filterText}
                    onFilterTextChange={setFilterText} />
                <MainContainer properties={properties} filterText={filterText} criteria={criteria} categories={categories} editProperty={id}/>
                <Footer />
            </div>
        );
    } else {

        return (
            <div className="Home">
                <Header filterText={filterText}
                    onFilterTextChange={setFilterText} />
                <Jumbotron />
                <MainContainer properties={properties} filterText={filterText} criteria={criteria} categories={categories} />
                <Footer />
            </div>
        );
    }
}



// MARK: - Main Container

function MainContainer({ properties, filterText, criteria, categories, editProperty }) {
    if (criteria == "host-add" || criteria == "host-edit") {
        return (
            <div class="container-fluid text-left">
                <div class="row align-items-sm-start">
                    <SideMenu criteria={criteria} />
                    <AddProperty criteria={criteria} editProperty={editProperty}/>
                </div>
            </div>
        );
    } else {
        return (
            <div class="container-fluid text-left">
                <div class="row align-items-sm-start">
                    <SideMenu criteria={criteria} />
                    <MainContent
                        properties={properties}
                        filterText={filterText}
                        criteria={criteria}
                        categories={categories} />
                </div>
            </div>
        );
    }
}


function PropertyImage({ propertyImage, isActive, imageUrl }) {
    var classvalue = 'carousel-item'
    if (isActive) {
        classvalue = classvalue.concat(' active')
    }
    if(imageUrl) {
        return (
            <div class={classvalue}>
                <img src={propertyImage} class="d-block w-100" alt="..." />
            </div>
        );
    }
    const image = "Assets/".concat(propertyImage);
    
    return (
        <div class={classvalue}>
            <img src={image} class="d-block w-100" alt="..." />
        </div>
    );
}

function Property({ property, criteria }) {
    const [imageData, setImageData] = useState('');
    let imagePath = property.imageFilePath;
    const navigate = useNavigate();
    const images = [];
    var isActive = false;
    var carouselId = "carouselExampleIndicators".concat(property.propertyId);
    var carouselTarget = "#".concat(carouselId);
    const localstorage_user = JSON.parse(localStorage.getItem('user'));

    const handleEdit = (e) => {
        if(e.target.textContent == "Edit") {
            navigate('/host/edit/'+property.propertyId);
        }
    }

    const handleClick = (e) => {
        if(e.target.textContent == "Add To Favorites") {
            e.target.textContent = "Added to Favorites";
            var path = "http://localhost:9000/users?id="+ localstorage_user.userId +"&propertyId="+property.propertyId+"&op=add";
            console.log(path);
            fetch(path, {
                method: 'PUT',
            })
            .then(res => res.json())
            .catch(console.log);
            e.target.classList.add("disabledButton");
        } else if(e.target.textContent == "Remove") {
            var path = "http://localhost:9000/users?id=" + localstorage_user.userId +"&propertyId="+property.propertyId+"&op=remove";
            fetch(path, {
                method: 'PUT',
            })
            .then(res => res.json())
            .catch(console.log);
            
        } else if(e.target.textContent == "Cancel Reservation") {
            var path = "http://localhost:9000/reservations?reservationid="+property.reservationId;
            fetch(path, {
                method: 'DELETE',
                headers:  {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth-token': localstorage_user.token
                },
            })
            .then(res => res.json())
            .catch(console.log);
        } else if(e.target.textContent == "Delete") {
            let availability_ = "Unavailable";
            var path = "http://localhost:9000/properties/deleteProperty?id="+property.propertyId;
            fetch(path, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({availability: availability_})
            })
            .then(res => res.json())
            .catch(console.log);
        }
        
    }
    var buttonText = "Add To Favorites";
    var viewButtonText = "View";
    var buttonClickPath = "";
    var showViewButton = "";
    var showCancelButton = "";
    var availabilityText = property.availability;
    var checkoutText = "";
    if(criteria == "favorites") {
        buttonText = "Remove";
        buttonClickPath = "/favorites/" + localstorage_user.userId;
    } else if(criteria == "reservations") {
        showViewButton = "none";
        availabilityText = "Check in: " + new Date(property.checkIn). toLocaleString(). split(',')[0]
        checkoutText = "\n\nCheck Out: " + new Date(property.checkOut). toLocaleString(). split(',')[0];
        var cancelCheck = (parseInt(new Date(property.checkIn) - new Date()) / 1000) / 3600;
        if(cancelCheck > 48) {
            buttonText = "Cancel Reservation"
        } else {
            showCancelButton = "none";
        }
        buttonClickPath = "/reservations/" + localstorage_user.userId;
    } else if(criteria == "host") {
        buttonText = "Delete";
        if(property.availability == "Unavailable") {
            showCancelButton = "none";
        }
        viewButtonText = "Edit";
    }
    if (property.images) {
        property.images.forEach((image_, index) => {
            if (index == 0) {
                isActive = true;
            } else {
                isActive = false;
            }
            images.push(
                <PropertyImage propertyImage={image_} isActive={isActive} />
            );
        });
    } else if(imageData) {
        let image = imageData
        images.push(<PropertyImage propertyImage={image} isActive={isActive} imageUrl={true} />)
    }

    var path = "/properties/" + property.propertyId;
    return (
        <div class="col-md-4 col-lg-3">
            <div class="card">
                <div id={carouselId} class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <Link to = {path}>
                    <div class="carousel-inner">
                        {images}
                    </div>
                    </Link>
                    <button class="carousel-control-prev" type="button" data-bs-target={carouselTarget} data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target={carouselTarget} data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="card-body">
                    <h6 class="card-title">{property.locationDetail}, {property.title}</h6>
                    <p class="card-text">{property.description}</p>
                    <p>{availabilityText}<br></br>{checkoutText}</p>
                    <p>${property.nightlyfee} per night</p>

                    <ul class="navbar-nav list-group flex-sm-row flex-column align-items-left" id="sbItems">
                        <button class="propertyButtons rounded-corners" style={{"display": showViewButton}} onClick={handleEdit}><a class="card-link nontextdecoration">{viewButtonText}</a></button> &nbsp;
                        <Link to = {buttonClickPath} onClick={handleClick}>
                            <button class="propertyButtons favButton rounded-corners" style={{"display": showCancelButton}}>
                                {buttonText}
                            </button>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function FilterItem({text}) {
    return (
        <li><a class="dropdown-item filterButtons" href="#">{text}</a></li>
    );
}

function FilterMenu({categories, cities, setFilterCity, setFilterCategory}) {
    const handleFilterCity = (e)=>{
        setFilterCity(e.target.textContent);
    }
    const handleFilterCategory = (e)=>{
        setFilterCategory(e.target.textContent);
    }
    const cityFilters = []
    cities.forEach((city) => {
        cityFilters.push(<FilterItem text = {city} />)
    })
    const categoryFilters = []
    categories.forEach((category) => {
        categoryFilters.push(<FilterItem text = {category.categoryTitle} />);
    })

    return (
        <div class="d-flex flex-row align-items-center">
            <div class="col-md-3 col-lg-1">
                <b>Filter by:</b>
            </div>
            <div class="col-md-4 col-lg-1">
                <div class="btn-group">
                    <button class="dropdown-toggle favButton propertyButtons rounded-corners" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                        City
                    </button>
                    <ul class="dropdown-menu" onClick={handleFilterCity}>
                        {cityFilters}
                    </ul>
                </div>
            </div>
            <div class="col-md-4 col-lg-1">
                <div class="btn-group">
                    <button class="dropdown-toggle favButton propertyButtons rounded-corners" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                        Property Type
                    </button>
                    <ul class="dropdown-menu" onClick={handleFilterCategory}>
                        {categoryFilters}
                    </ul>
                </div>

            </div>
        </div>
    );
}

function MainContent({ properties, filterText, criteria, categories }) {
    const [filterCity, setFilterCity] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    var property_list = [];
    const cities =  new Set();
    properties.forEach((property_) => {
        cities.add(property_.title);
    })
    
    properties.forEach((property_) => {
        let searchText = property_.title + property_.locationDetail
        if (searchText.toLowerCase().includes(filterText.toLowerCase())) {
            property_list.push(
                <Property
                    property={property_} criteria={criteria} />
            );
        }
    });

    if (filterCity != '') {
        property_list = []
        properties.forEach((property_) => {
            if (property_.title.toLowerCase().includes(filterCity.toLowerCase())) {
                property_list.push(
                    <Property
                        property={property_} criteria={criteria} />
                );
            }
        })
    }

    if(filterCategory != '') {
        property_list = []
        var categoryFilter = categories.find(element => element.categoryTitle.toLowerCase().includes(filterCategory.toLowerCase()));
        properties.forEach((property_) => {
            
            if (property_.categoryId.toLowerCase() == categoryFilter.categoryId.toLowerCase()) {
                property_list.push(
                    <Property
                        property={property_} criteria={criteria} />
                );
            }
        })
    }


        if(criteria == undefined) {
            return (
                <div class="col px-5 py-3">
                    <FilterMenu categories={categories} cities={cities} setFilterCity={setFilterCity} setFilterCategory={setFilterCategory}/>
                    <div class="row">
                        {property_list}
                    </div>
                </div>
            );
        } else {
            return (
                <div class="col px-5 py-3">
                    <div class="row">
                        {property_list}
                    </div>
                </div>
            );
        }
        
    // }
}

// MARK: - SideMenu



// MARK: - Footer

