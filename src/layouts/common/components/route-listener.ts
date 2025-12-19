import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Modal, message, notification } from 'antd';

export function RouteListener() {
  const location = useLocation();

  useEffect(() => {
    Modal.destroyAll();
    message.destroy();
    notification.destroy();
  }, [location.key]);

  return null;
}
