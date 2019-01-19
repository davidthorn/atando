import React, { Component } from 'react';
import { SidebarComponent } from '../../components/Sidebar/Sidebar'
import './App.scss';
import { SideBarItems } from '../../models/SideBarItems';
import { SideBarItem } from '../../components/Sidebar/SideBarItem';

interface AppState {
  feature: SideBarItem
}

interface AppProps {}

export class App extends Component<AppProps, AppState> {

  /**
   *Creates an instance of App.
   * @param {AppProps} props
   * @param {AppState} state
   * @memberof App
   */
  constructor(props: AppProps , state: AppState) {
    super(props, state)
    this.state = {
      feature:  SideBarItems.filter(i => i.active )[0]
    }
  }

  /**
   * The user has tapped this side bar item
   *
   * @param {SideBarItem} item
   * @memberof App
   */
  onSideBarItemTap(item: SideBarItem) {
    this.setState({
      feature: item
    })
  }

  render() {

    return (
      <div className="App bg-dark">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            ATANDO
          </a>
        </nav>
        <div className="main-container">
        <div className="left-column bg-dark">
          <SidebarComponent items={SideBarItems.filter(i => i.hidden === false)} onTap={this.onSideBarItemTap.bind(this)}>
          </SidebarComponent>
         
        </div>
        <div className="main-body">
          { this.state.feature.component }
        </div>
        </div>
      </div>
    );
  }
}

export default App;
