import React from 'react';
import PropTypes from 'prop-types';
import { Popper, Paper, MenuList, withStyles } from '@material-ui/core';
import SubMenuItem from './subMenuItem';
import styles from './styles';
import { MenusType } from '../types';


const DropMenu = ({ anchorEl = null, open = false, menus = [], placement }) => {

    return (
        <Popper open={open} anchorEl={anchorEl} placement={placement}>
            <Paper>
                <MenuList>
                    {
                        menus.map(item => <SubMenuItem key={item.id} item={item} />)
                    }
                </MenuList>
            </Paper>
        </Popper>
    )
};

DropMenu.prototype = {
    anchorEl: PropTypes.object,
    open: PropTypes.bool,
    menus: MenusType.isRequired,
    placement: PropTypes.string.isRequired
}

export default withStyles(styles)(DropMenu);
