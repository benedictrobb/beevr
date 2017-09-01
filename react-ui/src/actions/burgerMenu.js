import {action as toggleMenu} from 'redux-burger-menu';
    
const isOpen = false;
export const closeMenu = isOpen => dispatch => dispatch(toggleMenu(isOpen));
