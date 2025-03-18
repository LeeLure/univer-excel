
import { message, notification, Alert, } from "ant-design-vue"

export const useFeedback = () => {
  return { message, notification, alert: typeof Alert }
}