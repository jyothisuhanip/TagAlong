import { useNavigate } from 'react-router-dom';
export default function Header({ filterText, onFilterTextChange }) {
    const navigate = useNavigate();
    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    var loginText = "Login / Sign Up";
    var loginClickPath = "/login/guest";
    var loginClassList = "buttonAppearText"
    var logoutDisplay = "none";
    if(localstorage_user != null && localstorage_user.userId) {
        logoutDisplay = "block";
        if(localstorage_user.ishost == "false") {
            loginText = "Become a Host";
            loginClickPath = ""
        } else {
            loginText = "Host Dashboard";
            loginClickPath = ''
        }
        loginClassList = "propertyButtons favButton rounded-corners";
    }

    const handleHostNavigation = () => {
        navigate('/host/'+localstorage_user.userId);
    }

    const handleNewUser = () => {
        navigate('/login/guest');
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
    }

    const handleHostClicks = (e) => {

        if(e.target.textContent == "Become a Host") {
            // api
            fetch("http://localhost:9000/users/host?id="+localstorage_user.userId, {
                method: "PUT",
                body: JSON.stringify({
                    ishost: "true"
                }),
                headers: {
                    "Content-type": "application/json",
                }
            }).then(res => res.json())
            .then((data) => {
                localstorage_user.ishost = data.ishost;
                localStorage.setItem('user', JSON.stringify(localstorage_user));
                handleHostNavigation();
            })
        } else if(e.target.textContent == "Host Dashboard") {
            handleHostNavigation();
        } else {
            handleNewUser();
        }
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light static-top custom-navbar ">
            <div class="container-fluid">
                <a class="navbar-brand mr-2" href="/">
                    <img src="Assets/logo_travel.png" alt="logoHere" height="48" class="rounded-circle" /> &nbsp;<b class="logo_title">TAG ALONG!</b>

                </a>
                <button class="navbar-toggler" type="button" height="16" width="16" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="ml-auto mr-auto col-lg-4 col-md-12 p-0">
                        <SearchBar filterText={filterText}
                            onFilterTextChange={onFilterTextChange} />
                    </div>
                    <ul class="navbar-nav align-items-left logo_title">
                        <li class="nav-item" style={{"display":logoutDisplay}}>
                            <a class="nav-link active" aria-current="page" href="#" style={{ color: '#416bdf' }}  onClick={handleLogout}>Logout</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/" style={{ color: '#416bdf' }}>Home</a>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link" role="button" aria-expanded="false" style={{ color: '#416bdf' }}>
                               <button class = {loginClassList} onClick={handleHostClicks}>{loginText}</button> 
                            </a>
                            {/* <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="dropdown-item" href="">
                                        Guest
                                    </a></li>
                                <li><a class="dropdown-item" href="">Host</a></li>
                            </ul> */}

                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#416bdf" }}>
                                Location
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">USA</a></li>
                                <li><a class="dropdown-item" href="#">Asia</a></li>
                                <li><a class="dropdown-item" href="#">Africa</a></li>
                                <li><a class="dropdown-item" href="#">South America</a></li>
                                <li><a class="dropdown-item" href="#">Australia</a></li>
                            </ul>

                        </li>

                    </ul>
                </div>


            </div>
        </nav>
    );
}

function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <form class="d-flex" role="search">
            <input class="form-control" type="text" placeholder="Search Properties, Beaches, Places.."
                aria-label="Search"
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)} />
            <button class="search-icon" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>
        </form>
    );
}