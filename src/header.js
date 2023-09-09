import React from 'react'

function Header() {
  
  return (
    <div>
        <>
  {/* Page Header */}
  <div className="page-header">
    
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        {/* Brand and toggle get grouped for better mobile display */}
        <div className="navbar-header">
          <div className="logo-sm">
            <a href="#" id="sidebar-toggle-button">
              <i className="fa fa-bars" />
            </a>
            <a className="logo-box" >
              <span>Arihant Organics</span>
            </a>
            
          </div>
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <i className="fa fa-angle-down" />
          </button>
        </div>
        {/* Collect the nav links, forms, and other content for toggling */}
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav">
            <li>
              <a href="#" id="collapsed-sidebar-toggle-button">
                <i className="fa fa-bars" />
              </a>
            </li>
            <li>
              <a href="#" id="toggle-fullscreen">
                <i className="fa fa-expand" />
              </a>
            </li>
          
          </ul>
          <ul className="nav navbar-nav navbar-right">
            
            
            <li className="dropdown user-dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                style={{fontSize:"16px"}}
              >
           
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#"></a>
                </li>
                <li>
                  <a href="#">Calendar</a>
                </li>
                <li>
                  <a href="#">
                    <span className="badge pull-right badge-danger">42</span>
                    Messages
                  </a>
                </li>
                <li role="separator" className="divider" />
                <li>
                  <a href="#">Account Settings</a>
                </li>
                <li>
                  <a href="#">Log Out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* /.navbar-collapse */}
      </div>
      {/* /.container-fluid */}
    </nav>
  </div>
  {/* /Page Header */}
</>

    </div>
  )
}

export default Header;