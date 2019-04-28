import PropTypes from 'prop-types'


const DefaultMenuProps = {
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired
}

export const MenuItemType = PropTypes.shape({
    ...DefaultMenuProps,
    subItems: PropTypes.arrayOf({
        ...DefaultMenuProps
    })
})

export const MenusType = PropTypes.arrayOf(MenuItemType)