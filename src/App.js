import {CssBaseline, MuiThemeProvider} from '@material-ui/core'
import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Map} from './Map'
import {MapDebug} from './MapDebug'
import NavBar from './NavBar'
import Page from './Page'
import {theme} from './theme'
import './base.css'

class App extends Component {
  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <Page>
            <CssBaseline />
            <NavBar />
            <BrowserRouter>
              <Switch>
                <Route exact path={'/'} component={Map} />
                {/*TODO: fix*/}
                <Route path={'/:id'} component={Map} />
                <Route exact path={'/debug'} component={MapDebug} />
              </Switch>
            </BrowserRouter>
          </Page>
        </MuiThemeProvider>
      </>
    )
  }
}

export default App
