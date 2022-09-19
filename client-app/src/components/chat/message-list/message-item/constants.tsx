import { DeleteOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export const messageDropdownMenu = (
  handleDeleteMessage: () => void
) => (<Menu 
  items={[
    {
      key: 'delete',
      label: (
        <div onClick={handleDeleteMessage}><DeleteOutlined /> Delete message</div>
      )
    }
  ]}
/>);