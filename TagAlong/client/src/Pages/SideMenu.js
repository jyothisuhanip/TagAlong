
import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function SideMenu({ criteria }) {
    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    var favoritesPath = "/login/guest";
    var momentpath = "/login/guest";
    if (localstorage_user != null) {
        favoritesPath = "/favorites/" + localstorage_user.userId;
        momentpath = "/reservations/" + localstorage_user.userId;
    }
    var homeclassList = "container-fluid px-3 py-2";
    var hostclassList = "container-fluid px-3 py-2"
    var favclassList = "";
    var momentClassList = "";
    var favcolor = "black";
    var homecolor = "black";
    var hostcolor = "black";
    var momentColor = "";
    var addPropertyTitle = "Add a Property";
    if (criteria == "favorites") {
        favclassList = "container-fluid propertyButtons pr-8 py-2"
        favcolor = "white";
    } else if (criteria == "reservations") {
        momentClassList = "container-fluid propertyButtons pr-8 py-2"
        momentColor = "white";
    } else if (criteria == "host") {
        homeclassList = "container-fluid px-3 py-2 propertyButtons"
        homecolor = "white"
    } else if (criteria == "host-add" || criteria == "host-edit") {
        hostclassList = "container-fluid px-3 py-2 propertyButtons"
        hostcolor = "white"
        homeclassList = "container-fluid px-3 py-2"
        homecolor = "black"
        if(criteria == "host-edit") {
            addPropertyTitle = "Edit a Property";
        }
    } else {
        homeclassList = "container-fluid propertyButtons px-3 py-2"
        homecolor = "white"
    }
    if (criteria == "host" || criteria == "host-add" || criteria == "host-edit") {
        let hostPath = "/host/" + localstorage_user.userId; 
        return (
            <div class="col-lg-2 col-md-3 px-sm-2 px-md-0 custom-navbar">
                <div class="d-flex flex-column  align-items-left align-items-sm-start side-menu-list">
                    <div class={homeclassList}>
                        <a href={hostPath} class="d-flex flex-column align-items-left">
                            <span class="fs-8 sidemenu-buttons "  style={{ "color": homecolor }}>Your Properties</span>
                        </a>
                    </div>
                    <div class="container-fluid px-3 py-2">
                        <a href="/" class="d-flex flex-column align-items-left">
                            <span class="fs-8 sidemenu-buttons " >Go to User Page</span>
                        </a>
                    </div>
                    <div class={hostclassList}>
                        <a href="/host/add" class="d-flex flex-column align-items-left">
                            <span class="fs-8 sidemenu-buttons" style={{ "color": hostcolor }}>{addPropertyTitle}</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div class="col-lg-2 col-md-3 px-sm-2 px-md-0 py-1 custom-navbar">
                <div class="d-flex flex-column  align-items-left align-items-sm-start side-menu-list">
                    <div class={homeclassList}>
                        <a href="/" class="d-flex flex-column align-items-left text-decoration-none">
                            <span class="fs-5 sidemenu-buttons" style={{ "color": homecolor }}>Specially For you</span>
                        </a>
                    </div>
                    <ul class="nav nav-pills flex-column align-items-sm-left px-3 side-menu-list" id="menu">
                        <li>
                            <Link to={momentpath}>
                                <div class={momentClassList}>
                                    <i class="fs-4 bi-grid"></i> <span class="ms-1 sidemenu-buttons side-menu" style={{ color: momentColor }}>
                                        Your Moments
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0 align-left">
                                <i class="fs-4 bi-table"></i> <span class="ms-1 sidemenu-buttons side-menu">Upcoming Moments</span></a>
                        </li>
                        <li>
                            <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-left ">
                                <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 sidemenu-buttons side-menu">Categories</span></a>
                            <ul class="collapse nav flex-column ms-3" id="submenu2" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Treehouses</span></a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Amazing Views</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">National Parks</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Lake Front</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Campers</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Cabins</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Tiny Homes</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Islands</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Surfing</span> </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Amazing Pools</span> </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to={favoritesPath}>
                                <div class={favclassList}>
                                    <i class="fs-4 bi-grid"></i> <span class="ms-1 sidemenu-buttons side-menu" style={{ color: favcolor }}>
                                        Your Favorites
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0 align-left">
                                <i class="fs-4 bi-people"></i> <span class="ms-1 sidemenu-buttons side-menu">Write to Us</span>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}