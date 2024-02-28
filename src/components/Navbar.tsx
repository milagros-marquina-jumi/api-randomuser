export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand d-flex justify-content-center align-items-center text-center" href="#">
        <img
          src="https://logo.clearbit.com/clearbit.com"
          alt="Logo de la empresa"
          className="d-inline-block align-text-top"
          height="30"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav"></ul>
      </div>
    </div>
  </nav>
  );
}
