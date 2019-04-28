import React from 'react';
import PropsTypes from 'prop-types';
import { MenuItem, ListItemText, MenuList, ListItemIcon } from '@material-ui/core';
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import DropMenu from '../dropMenu';



class SubItem extends React.Component {
    state = {
        open: false,
        anchorEl: null,
        selectedItem: null,
        menuListProps: {
            ...MenuList.propTypes
        },
        MenuItemProps: {
            ...MenuItem.propTypes
        },
        onClick: PropsTypes.func
    };

    static defaultProps = {
        onClick: () => { }
    }

    handleMenuOpen = item => event => {
        const { currentTarget } = event;
        this.setState({
            open: true,
            anchorEl: currentTarget,
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

    handleItemClick = item => event => {
        this.props.onClick(item, event)
    };

    wrapper = React.createRef();
    render() {
        const { item, MenuItemProps } = this.props
        const { anchorEl, open } = this.state
        return (
            <div onMouseLeave={this.handleMenuClose}>
                <MenuItem
                    {...MenuItemProps}
                    onMouseEnter={this.handleMenuOpen(item)}
                    onClick={this.handleItemClick(item)}
                >
                    <ListItemText primary={item.name} />
                    {item.subItems.length > 0 && <ListItemIcon ><ArrowRightIcon /></ListItemIcon>}
                </MenuItem>
                <DropMenu
                    menus={item.subItems}
                    anchorEl={anchorEl}
                    open={open}
                    placement="right-start"
                    {...this.props}
                />
            </div>
        )

    }
}

export default SubItem;
