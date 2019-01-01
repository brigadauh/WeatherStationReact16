import React, { Component } from 'react';

class Footer extends Component  {
    //constructor(props){
    //    super(props);
    //}
    render() {
        const currYear = new Date().getFullYear();
        return(
            <React.Fragment>
            <footer>
              <div className="content container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <p id = "GlobalFooterCopyright">&copy; 2017-<span id = "GlobalFooterCopyrightYear">{currYear}</span> Home Weather. All rights reserved.</p>
                  </div>
                  <div className="col-sm-6">
                    <nav className="navbar navbar-default">
                      <ul className="nav navbar-nav navbar-right display-none">
                        <li><a href="/terms">Terms of use</a></li>
                        <li><a href="/privacy">Privacy policy</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </footer>
            </React.Fragment>
        );
    }
}
export default Footer;
