import { MenuItemProps } from "@components/menu-item/models";

export interface MenuProps {
    sections?: MenuItemProps[];
    width?: string | number;
    collapsed?: boolean;
}