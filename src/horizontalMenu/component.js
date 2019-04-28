import * as React from 'react';
import PropsTypes from 'prop-types';
import { AppBar, Paper, MenuList, MenuItem, Tabs, Tab, withStyles } from '@material-ui/core';
import { MenusType } from '../types';
import DropMenu from '../dropMenu';
import styles from './styles'

class AppBarTop extends React.Component {

    static propsTypes = {
        classes: PropsTypes.shape({}),
        menus: MenusType.isRequired,
        tabsProps: Tabs.propTypes,
        menuListProps: {
            ...MenuList.propTypes
        },
        MenuItemProps: {
            ...MenuItem.propTypes
        },
        onClick: PropsTypes.func
    }
    static defaultProps = {
        onClick: () => { }
    }

    state = {
        value: 0,
        open: false,
        anchorEl: null,
        activeIndex: 0,
        selectedItem: null
    };

    handleMenuOpen = (item, index) => event => {
        const { currentTarget } = event;
        this.setState({
            open: true,
            anchorEl: currentTarget,
            value: index,
            selectedItem: item
        });
    };

    handleItemClick = item => event => {
        this.props.onClick(item, event)
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
        const { classes, menus, tabsProps, onClick, ...restProps } = this.props;
        const { anchorEl, open, selectedItem } = this.state;

        return (
            <div
                className={classes.root}
                onMouseLeave={this.handleMenuClose}
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
                                        onMouseEnter={this.handleMenuOpen(item, index)}
                                        onClick={this.handleItemClick(item, index)}
                                    />
                                ))
                            }
                        </Tabs>
                        <DropMenu
                            open={open}
                            anchorEl={anchorEl}
                            menus={selectedItem ? selectedItem.subItems : []}
                            placement="bottom"
                            onClick={onClick}
                            {...restProps}
                        />
                    </Paper>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(AppBarTop);
