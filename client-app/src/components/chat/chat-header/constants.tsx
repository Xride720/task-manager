import { DeleteOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export const chatDropdownMenu = (
  handleDeleteChat: () => void
) => (<Menu 
  items={[
    {
      key: 'delete',
      label: (
        <div onClick={handleDeleteChat}><DeleteOutlined /> Delete chat</div>
      )
    }
  ]}
/>);