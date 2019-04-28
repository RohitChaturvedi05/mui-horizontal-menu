import { sortBy } from 'lodash/fp';

function recurseMenu({ data, parent, sortField }) {
    const menus = [];
    for (const x in data) {
        if (data[x].parentId === parent) {
            let item = {
                ...data[x],
                subItems: recurseMenu({ data, parent: data[x].id, sortField })
            }
            menus.push(item);
        }
    }

    return sortField ? sortBy(sortField, menus) : menus;
}

export const prepareMenuData = ({ data, sortField = 'name' }) => {
    return recurseMenu({ data, parent: -1, sortField });
}