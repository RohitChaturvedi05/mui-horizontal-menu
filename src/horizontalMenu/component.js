import * as React from 'react';
import PropsTypes from 'prop-types';
import {
    AppBar, Paper, Popper, Tabs, Tab, withStyles
} from '@material-ui/core';
import { MenusType } from '../types';
import DropMenu from '../dropMenu';
import styles from './styles'

class AppBarTop extends React.Component {

    static propsTypes = {
        classes: PropsTypes.shape({}),
        menus: MenusType.isRequired
    }

    state = {
        value: 0,
        open: false,
        anchorEl: null,
        activeIndex: 0,
        selectedItem: null
    };

    handleMenuClick = index => { };

    handleMenuOpen = (item, index) => event => {
        const { currentTarget } = event;
        this.setState({
            open: true,
            anchorEl: currentTarget,
            value: index,
            selectedItem: item
        });
    };

    handleMenuClose = () => {
        const { activeIndex } = this.state;
        this.setState({
            open: false,
            anchorEl: null,
            value: activeIndex
        });
    };

    handleMenuSelect = (index, event) => {
        this.setState({
            open: false,
            anchorEl: null,
            activeIndex: index
        });
    };

    render() {
        const { classes, menus } = this.props;
        const { anchorEl, open, selectedItem } = this.state;

        return (
            <div
                className={classes.root}
                onMouseLeave={this.handleMenuClose.bind(this)}
            >
                <AppBar position='static'>
                    <Paper className={classes.grow}>
                        <Tabs
                            value={this.state.value}
                            indicatorColor='primary'
                            textColor='primary'
                            centered
                        >
                            {
                                menus.map((item, index) => (
                                    <Tab
                                        key={item.id}
                                        data-key={index}
                                        label={item.name}
                                        onClick={this.handleMenuOpen(item, index)}
                                        aria-owns={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup={'true'}
                                    />
                                ))
                            }
                        </Tabs>
                        {
                            selectedItem && <DropMenu
                                open={open}
                                anchorEl={anchorEl}
                                menus={selectedItem.subItems}
                                placement="bottom"
                            />
                        }
                    </Paper>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(AppBarTop);
