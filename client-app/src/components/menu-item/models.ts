import { IconType } from "@assets/resources/icons";

export interface MenuItemProps {
    section: {
        id: string;
        name: string;
        icon: IconType | JSX.Element;
        note: string;
    },
    collapsed?: boolean;
}


export interface MenuItemType {
    id: string;
    name: string;
    icon: IconType | JSX.Element;
    note: string;
}