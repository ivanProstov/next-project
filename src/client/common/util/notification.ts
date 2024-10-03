import { notification } from "antd";

notification.config({
  placement: "bottomRight",
  top: 50,
  duration: 3,
});

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = (
  type: NotificationType,
  message: string,
  description?: string,
) => {
  return notification[type]({
    message,
    description,
  });
};
