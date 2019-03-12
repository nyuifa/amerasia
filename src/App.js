import {CssBaseline, MuiThemeProvider} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog/Dialog';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './base.css';
import AboutPage from './components/AboutPage';
import AccessibilityPage from './components/AccessibilityPage';
import CreditsPage from './components/CreditsPage';
import MapDebugPage from './components/MapDebugPage';
import MapPage from './components/MapPage';
import NavBar from './components/NavBar';
import {theme} from './theme';

const lsKey = 'welcomeDialogLastSeen';

class App extends Component {
  state = {
    welcomeDialogOpen: false
  };

  componentDidMount() {
    const MIN_INTERVAL = 300000; // 5 minutes
    const lastSeen = window.localStorage.getItem(lsKey) || 0;

    if (Date.now() - lastSeen > MIN_INTERVAL) {
      this.setState({
        welcomeDialogOpen: true
      });
      window.localStorage.setItem(lsKey, Date.now());
    }
  }

  closeWelcomeDialog = () => {
    window.localStorage.setItem(lsKey, Date.now());
    this.setState({welcomeDialogOpen: false});
  };

  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <>
              <NavBar />
              <Switch>
                <Route exact path={'/'} component={MapPage} />
                <Route exact path={'/debug'} component={MapDebugPage} />
                <Route exact path={'/about'} component={AboutPage} />
                <Route exact path={'/credits'} component={CreditsPage} />
                <Route exact path={'/accessibility'} component={AccessibilityPage} />

                {/* IMPORTANT NOTE: This route MUST be at the end */}
                <Route exact path={'/:id'} component={MapPage} />
              </Switch>
            </>
          </BrowserRouter>
          <Dialog open={this.state.welcomeDialogOpen} onClose={this.closeWelcomeDialog}>
            Hello World
          </Dialog>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
