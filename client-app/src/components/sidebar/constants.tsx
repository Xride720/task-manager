import { UnorderedListOutlined, WechatOutlined } from "@ant-design/icons";
import { IconType } from "@assets/resources/icons";
import { MenuItemType } from "@components/menu-item/models";
import { SidebarProps } from "./models";

export const defaultSidebarProps: SidebarProps = {
    fullWidth : 200,
    collapsedWidth : 80
};


const getItem = (
    name: string,
    note: string,
    id: string,
    icon: JSX.Element | IconType,
): MenuItemType => {
    return {
        name,
        note,
        id,
        icon,
    } as MenuItemType ;
}
export const menuItems: MenuItemType[] = [
    getItem('todolist', 'TodoList', '1', <UnorderedListOutlined />),
    getItem('chat', 'Chat', '2', <WechatOutlined />),

    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Option 7', '7'),
    //     getItem('Option 8', '8'),
    // ]),
];