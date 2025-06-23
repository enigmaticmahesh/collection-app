import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import AddName from "./AddName.component";

const AddNameBtn = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const closeBtn = (
        <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
        />
    )
    return (
        <>
            <Drawer
                title="Add Person"
                placement="bottom"
                closable={false}
                onClose={onClose}
                open={open}
                height="75%"
                destroyOnHidden={true}
                extra={closeBtn}
            >
                <AddName />
            </Drawer>
            <Button type="primary" onClick={showDrawer}>Add</Button>
        </>
    )
}

export default AddNameBtn