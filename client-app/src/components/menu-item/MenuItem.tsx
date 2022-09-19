import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useLocation } from 'react-router-dom';

import { iconsResource } from '@assets/resources/icons';

import { MenuItemProps } from './models';
import cl from './MenuItem.module.scss';
import cn from 'classnames';
import { Tooltip } from 'antd';


const MenuItem: FC<MenuItemProps> = ({ section, collapsed }) => {
    const location = useLocation();
    return (
        <Tooltip title={collapsed ? section.note : ""} placement="right">
            <div className={cl.menuItem}>
                <NavLink
                    className={({ isActive }) =>
                        cn(isActive ? [cl.menuItem_link, cl.activeLink] : [cl.menuItem_link, cl.commonLink])
                    }
                    to={"/" + section.name}
                >
                    <div className={cl.menuItem_link_itemContainer_icon}>
                        {
                        typeof section.icon === "string" ? <ReactSVG
                            className={cn(location.pathname.replace('/', '') === section.name ? cl.activeIcon : '')}
                            src={iconsResource[section.icon] ?? ''}
                        /> : section.icon
                        }
                    </div>
                    {collapsed ? '' : <div className={cl.menuItem_link_itemContainer_label}>{section.note}</div>}
                </NavLink>
        </div>
        </Tooltip>
    );
};

export { MenuItem };
