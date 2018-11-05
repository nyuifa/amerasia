import {withStyles, withWidth} from '@material-ui/core'
import {yellow} from '@material-ui/core/colors'
import Drawer from '@material-ui/core/Drawer/Drawer'
import Grid from '@material-ui/core/Grid/Grid'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import {isWidthUp} from '@material-ui/core/withWidth'
import Close from '@material-ui/icons/Close'
import LocationOn from '@material-ui/icons/LocationOn'
import MyLocation from '@material-ui/icons/MyLocation'
import ZoomIn from '@material-ui/icons/ZoomIn'
import ZoomOut from '@material-ui/icons/ZoomOut'
import ZoomOutMap from '@material-ui/icons/ZoomOutMap'
import {find, flow} from 'lodash'
import OpenSeadragon from 'openseadragon'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {DATA} from '../data'
import {headerHeight} from './NavBar'

const drawerWidth = 500
const drawerWidthMd = 350
const drawerWidthSm = '100vw'

const styles = (theme) => ({
  buttons: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: theme.zIndex.appBar,
  },
  actionButton: {
    margin: 4,
    transition: theme.transitions.create(['background']),
    background: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 1)',
    }
  },
  icon: {
    width: 20,
    height: 20,
  },
  drawerPaper: {
    width: drawerWidthSm,
    height: '50vh',
    padding: 2 * theme.spacing.unit,
    marginTop: 0,
    paddingBottom: 100,

    [theme.breakpoints.up('sm')]: {
      marginTop: headerHeight,
      width: drawerWidthMd,
      height: '100vh',
    },

    [theme.breakpoints.up('md')]: {
      marginTop: headerHeight,
      width: drawerWidth,
      height: '100vh',
    },
  },
  mapContainer: {
    background: '#4c221a',
    marginTop: headerHeight,
    transition: theme.transitions.create(['width', 'height']),
  },
})

export class MapPage extends Component {
  container = React.createRef()

  state = {
    drawerOpen: false,
    selectedHtml: '',
    canvasHovered: false,
  }

  componentDidMount() {
    this.viewer = OpenSeadragon({
      element: this.container.current,
      prefixUrl: `${process.env.PUBLIC_URL}/map/vopel_files/`,
      tileSources: `${process.env.PUBLIC_URL}/map/vopel.dzi`,
      overlays: this.createOverlaysFromData(),
      zoomInButton: 'zoom-in-button',
      zoomOutButton: 'zoom-out-button',
      homeButton: 'home-button',
    })
    this.viewer.viewport.minZoomLevel = 0.5
    this.viewer.gestureSettingsMouse.clickToZoom = false;

    if (this.props.match.params.id) {
      const point = find(DATA, {id: this.props.match.params.id})
      if (point) {
        setTimeout(() => this.navigateTo(point), 700)
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const point = find(DATA, {id: this.props.match.params.id})
      if (point) {
        this.navigateTo(point)
      }
    }
  }

  navigateTo = (point) => {
    const target = new OpenSeadragon.Point(point.x, point.y)
    this.viewer.viewport.panTo(target)
    // Timeout to cancel out race condition with zoom animation
    setTimeout(() => {
      this.viewer.viewport.zoomTo(9, target)
    }, 700)
    this.setState({
      drawerOpen: true,
      selectedHtml: point.html,
    })
  }

  makeMarkerClickHandler = (point) => () => {
    if (this.props.match.params.id !== point.id) {
      this.props.history.push(point.id)
    }
  }

  focusPointOnMap = () => {
    const point = find(DATA, {id: this.props.match.params.id})
    if (point) {
      this.navigateTo(point)
    }
  }

  createOverlaysFromData = () => {
    return DATA.map((point) => {
      const clickHandler = this.makeMarkerClickHandler(point)

      const locationMarker = (
        <IconButton id={point.id} aria-label={point.id} onClick={clickHandler}>
          <LocationOn style={{fontSize: '1.2em', color: yellow[400], cursor: 'pointer'}}/>
        </IconButton>
      )

      const locationMarkerContainer = document.createElement('div')
      ReactDOM.render(locationMarker, locationMarkerContainer)

      // Note: we only need this for mobile support for now
      new OpenSeadragon.MouseTracker({
        element: locationMarkerContainer,
        clickHandler: clickHandler,
      })

      return ({
        ...point,
        placement: OpenSeadragon.Placement.CENTER,
        element: locationMarkerContainer,
      })
    })
  }

  onDrawerClose = () => {
    this.setState({drawerOpen: false})
    this.props.history.push('/')
  }

  onCanvasEnter = () => {
    this.setState({canvasHovered: true})
  }

  onCanvasLeave = () => {
    this.setState({canvasHovered: false})
  }

  calcMapDimensions = () => {
    const height = isWidthUp('sm', this.props.width)
      ? `calc(100vh - ${headerHeight}px)`
      : '50vh'

    if (!this.state.drawerOpen) {
      return {
        width: '100vw',
        height,
      }
    }
    if (isWidthUp('sm', this.props.width)) {
      return {
        width: `calc(100vw - ${drawerWidthMd}px)`,
        height,
      }
    } else if (isWidthUp('md', this.props.width)) {
      return {
        width: `calc(100vw - ${drawerWidth}px)`,
        height,
      }
    }

    return {
      width: drawerWidthSm,
      height,
    }
  }

  render() {
    const {classes, width} = this.props
    return (
      <>
        <div
          ref={this.container}
          id={'test'}
          className={classes.mapContainer}
          style={this.calcMapDimensions()}
          onMouseEnter={this.onCanvasEnter}
          onMouseLeave={this.onCanvasLeave}
        >
          <div className={classes.buttons} style={{opacity: this.state.canvasHovered ? 1 : 0}}>
            <Grid container direction={'column'}>
              <Tooltip title={'Zoom In'}>
                <IconButton className={classes.actionButton} id={'zoom-in-button'} aria-label={'zoom-in'}>
                  <ZoomIn className={classes.icon}/>
                </IconButton>
              </Tooltip>
              <Tooltip title={'Zoom Out'}>
                <IconButton className={classes.actionButton} id={'zoom-out-button'} aria-label={'zoom-out'}>
                  <ZoomOut className={classes.icon}/>
                </IconButton>
              </Tooltip>
              <Tooltip title={'Reset Zoom'}>
                <IconButton className={classes.actionButton} id={'home-button'} aria-label={'home'}>
                  <ZoomOutMap className={classes.icon}/>
                </IconButton>
              </Tooltip>
            </Grid>
          </div>
        </div>
        <Drawer
          variant={'persistent'}
          anchor={isWidthUp('sm', width) ? 'right' : 'bottom'}
          open={this.state.drawerOpen}
          onClose={this.onDrawerClose}
          BackdropProps={{invisible: true}}
          classes={{paper: classes.drawerPaper}}
        >
          <Grid container justify={'flex-end'}>
            <Grid item>
              <Tooltip title={'Focus on Map '}>
                <IconButton aria-label={'Focus on Map'} onClick={this.focusPointOnMap}>
                  <MyLocation/>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Close'}>
                <IconButton aria-label={'Close Sidebar'} onClick={this.onDrawerClose}>
                  <Close/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <div dangerouslySetInnerHTML={{__html: this.state.selectedHtml}}/>
        </Drawer>
      </>
    )
  }
}

export default flow([
  withWidth(),
  withStyles(styles, {withTheme: true})
])(MapPage)
