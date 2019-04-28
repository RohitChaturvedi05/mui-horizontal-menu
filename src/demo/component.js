import React from 'react';
import data from '../data';
import Menu from '../horizontalMenu';
import { prepareMenuData } from '../utils';



export default class App extends React.Component {

  state = {
    menus: prepareMenuData({ data })
  }

  render() {
    const { menus } = this.state
    return <Menu menus={menus} />
  }
}
