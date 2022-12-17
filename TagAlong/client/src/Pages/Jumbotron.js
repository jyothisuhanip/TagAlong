export default function Jumbotron() {
    return (
        <div class="jumbotron mb-0" style={{ "background-image": "url(Assets/jumbo.jpg)", "box-shadow": "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)" }}>
            <div class="col-lg-5 ms-auto mr-auto">

                <div class="jumbheading align-items-center">
                    <center>
                        <h2>
                            Never Miss a Moment!!
                        </h2>
                    </center>

                </div>

                <div class="input-group searchLine" id="jumbElements">
                    <form>
                        <ul class="navbar-nav list-group flex-sm-row flex-column align-items-center" id="sbItems">
                            <li>
                                <i class="fs-2 bi-bootstrap"></i>
                                <div>
                                    <input type="text" class="form-control" id="fDate" placeholder="Email Address" />
                                    <span class="input-group-append"></span>
                                </div>
                            </li>
                            <li>
                                <i class="fs-2 bi-bootstrap"></i>
                                <div>
                                    {/* <div class="input-group date" id="datepicker"> */}
                                    <input type="text" class="form-control" id="fDate" placeholder="City to Tag Along" />
                                    <span class="input-group-append"></span>
                                    {/* </div> */}
                                </div>
                            </li>

                            <li>
                                <button class="form-round propertyButtons py-1 submit-btn" type="button">Subscribe</button>
                            </li>
                        </ul>
                    </form>
                </div>
                <div class="jumbheading align-items-center">
                    <center><h5>Subscribe and be the first to receive our exclusive offers</h5></center>
                </div>

                <center><h6>Benefit from exclusive offers, personalized notifications, seamless booking functions and more. <u>Learn More</u></h6></center>
            </div>
        </div>
    );
}