import React, { Component, Fragment } from 'react';
import { SidebarComponent } from '../../components/Sidebar/Sidebar';
import { SideBarItem } from '../../components/Sidebar/SideBarItem';
import { SideBarItems } from '../../models/SideBarItems';
import { LoginFormFeature } from '../login';
import './App.scss';
import { AppContainer } from "./AppContainer";
import { AppNavigator } from "./AppNavigator";
import { Router } from './Router';

interface AppState {
  feature: SideBarItem
  authenticated: boolean
  isSuperAdmin: boolean
}

interface AppProps { }

export class App extends Component<AppProps, AppState> implements Router {

  storageIdTokenKey: string = 'idToken'

  tokenExpiresAtKey: string = 'tokenExpiresAT'

  navigator: AppNavigator

  /**
   *Creates an instance of App.
   * @param {AppProps} props
   * @param {AppState} state
   * @memberof App
   */
  constructor(props: AppProps, state: AppState) {
    super(props, state)
    this.navigator = new AppNavigator()
    this.state = {
      feature: SideBarItems(this).filter(i => i.active)[0],
      authenticated: this.isAuthenticated(),
      isSuperAdmin: true
    }
  }

  isAuthenticated(): boolean {
    let expiresAt: number = localStorage.getItem(this.tokenExpiresAtKey) === null ? Date.now() : parseInt(localStorage.getItem(this.tokenExpiresAtKey)!)
    return Date.now() < expiresAt && localStorage.getItem(this.storageIdTokenKey) !== null
  }

  isSuperAdminUser(): boolean {
    let expiresAt: number = localStorage.getItem(this.tokenExpiresAtKey) === null ? Date.now() : parseInt(localStorage.getItem(this.tokenExpiresAtKey)!)
    return Date.now() < expiresAt
  }

  shouldRender?: (route: string, args: any) => void;

  navigate(routeName: string, args: { [key: string]: any }): void {

    if (!this.isAuthenticated()) {
      localStorage.removeItem(this.storageIdTokenKey)
      localStorage.removeItem(this.tokenExpiresAtKey)
      this.setState({
        authenticated: false
      })
    } else {
      this.navigator.shouldRender = this.shouldRender
      this.navigator.navigate(routeName, args)
    }
  }

  /**
   * The user has tapped this side bar item
   *
   * @param {SideBarItem} item
   * @memberof App
   */
  onSideBarItemTap(item: SideBarItem) {
    this.navigate(item.route, {})
  }

  onAuthenticated(result: boolean, token: { idToken: string, expiresAt: number }): void {
    if (result) {
      localStorage.setItem(this.storageIdTokenKey, token.idToken)
      localStorage.setItem(this.tokenExpiresAtKey, token.expiresAt.toString())
    }

    this.setState({
      authenticated: result
    })
  }

  render() {

    let content;

    switch (this.state.authenticated) {
      case true:
        content = (
          <Fragment>
            <div className="left-column bg-dark">
              <SidebarComponent
                items={SideBarItems(this).filter(i => i.hidden === false)}
                onTap={this.onSideBarItemTap.bind(this)}>
              </SidebarComponent>
            </div>
            <div className="main-body">
              <AppContainer isSuperAdmin={this.state.isSuperAdmin} navigator={this} />
            </div>
          </Fragment>
        )
        break;
      case false:
        content = (
          <Fragment>
            <LoginFormFeature
              onAuthenticated={this.onAuthenticated.bind(this)}
            ></LoginFormFeature>
          </Fragment>
        )
        break;
    }

    return (
      <div className="App bg-dark">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            ATANDO
          </a>
        </nav>
        <div className="main-container">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
