import React from 'react';
import { MenuItem, ListItemText, ListItemIcon, Popper } from '@material-ui/core';
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import DropMenu from '../dropMenu';



class SubItem extends React.Component {
    state = {
        open: false,
        anchorEl: null,
        selectedItem: null
    };

    handleMenuClick = index => { };

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

    handleMenuSelect = (index, event) => {
        this.setState({
            open: false,
            anchorEl: null,
            activeIndex: index
        });
    };
    render() {
        const { item } = this.props
        const { anchorEl, open } = this.state
        return (
            <React.Fragment>
                <MenuItem onMouseEnter={this.handleMenuOpen(item)}>
                    <ListItemText primary={item.name} />
                    {item.subItems.length > 0 && <ListItemIcon ><ArrowRightIcon /></ListItemIcon>}
                </MenuItem>
                {
                    item.subItems.length > 0 && (
                        <DropMenu
                            menus={item.subItems}
                            anchorEl={anchorEl}
                            open={open}
                            placement="right-start" />
                    )
                }
            </React.Fragment>
        )

    }
}

export default SubItem;
