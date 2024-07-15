export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="wd-dashboard-course col mb-2" style={{ width: "300px"}}>
                        <div className="card text-truncate">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                    href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/reactjs.jpg" width="100%" height="171.39px"/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">CS1234 React JS</h5>
                                        <p className="card-text">
                                            CS1234<br />
                                            Sec 1, Fall 2024 Semester
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col mb-2" style={{ width: "300px" }}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                    href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/CS2810.png" width="100%" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title text-truncate">CS2810 Mathematics of Data Models</h5>
                                        <p className="card-text">
                                            CS2810<br />
                                            Sec 2, Fall 2024 Semester
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col mb-2" style={{ width: "300px" }}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                    href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/CS3500.png" width="100%" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title text-truncate">CS3500 Object Oriented Design</h5>
                                        <p className="card-text">
                                            CS3500<br />
                                            Sec 3, Spring 2025 Semester
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col mb-2" style={{ width: "300px" }}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                    href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/CS3650.png" width="100%" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title text-truncate">CS3650 Computer Systems</h5>
                                        <p className="card-text">
                                            CS3650<br />
                                            Sec 1, Spring 2025 Semester
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col mb-2" style={{ width: "300px" }}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                    href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/CS3000.png" width="100%" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">CS3000 Algorithms</h5>
                                        <p className="card-text">
                                            CS3000<br />
                                            Sec 1, Spring 2025 Semester
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col mb-2" style={{ width: "300px" }}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                    href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/CS4410.png" width="100%" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">CS4410 Compilers</h5>
                                        <p className="card-text">
                                            CS4410<br />
                                            Sec 2, Summer I 2025 Semester
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col mb-2" style={{ width: "300px" }}>
                        <div className="card">
                            <div>
                                <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                    href="#/Kanbas/Courses/1234/Home">
                                    <img src="/images/CS5610.png" width="100%" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title text-truncate">CS5610 Web Development</h5>
                                        <p className="card-text">
                                            CS5610<br />
                                            Sec 1, Summer II 2025 Semester
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
