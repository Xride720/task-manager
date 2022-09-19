import React, { FC } from 'react';

import { MenuItem } from '../menu-item';
import cl from './Menu.module.scss';
import { MenuProps } from './models';


const Menu: FC<MenuProps> = ({ sections, width, collapsed }) => {
    const style = {
        minWidth: width || undefined,
        maxWidth: width || undefined,
        width: width || undefined
    };
    return (
        <div className={cl.menu} style={style}>
            {sections?.map(s => (
                <MenuItem key={s.section.id} section={s.section}  collapsed={collapsed}/>
            ))}
        </div>
    );
};

export { Menu };
