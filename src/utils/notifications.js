import { notification } from 'ant-design-vue';
import 'ant-design-vue/lib/notification/style/css';

const error = (message) => {
  notification.error({
    message: 'Ошибка!',
    description: message,
    placement: 'bottomRight',
  });
};

const success = (title, message) => {
  notification.success({
    message: title,
    description: message,
    placement: 'bottomRight',
  });
};

export default {
  error,
  success,
};
