import { message } from "antd";
import { useEffect } from "react";
import { CUSTOM_EVENTS } from "../constants";

const Alert = () => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const controller = new AbortController()
        const displayAlert = (e: any) => {
            const { type, content } = e.detail
            messageApi.open({
                type, content, duration: 2
            })
        }
        
        document.addEventListener(CUSTOM_EVENTS.SHOW_ALERT, displayAlert, { signal: controller.signal });
        return () => {
            controller.abort()
        }
    }, [messageApi])
    
    return (
        <>{contextHolder}</>
    )
}

export default Alert