import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

interface NotificationProps {
  message: string;
  visible: boolean;
  duration?: number; // Thời gian hiển thị (mặc định 2000ms)
  onHide?: () => void; // Callback khi thông báo ẩn
  backgroundColor?: string; // Màu nền tùy chỉnh
  textColor?: string; // Màu chữ tùy chỉnh
}

const Notification: React.FC<NotificationProps> = ({
  message,
  visible,
  duration = 2000,
  onHide,
  backgroundColor = '#28a745',
  textColor = '#fff',
}) => {
  const [notificationOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    if (visible) {
      notificationOpacity.setValue(1); // Đặt lại opacity về 1 khi hiển thị

      // Hiệu ứng mờ dần sau duration
      const timer = setTimeout(() => {
        Animated.timing(notificationOpacity, {
          toValue: 0,
          duration: 500, // Hiệu ứng mờ dần trong 0.5 giây
          useNativeDriver: true,
        }).start(() => {
          if (onHide) onHide(); // Gọi callback khi ẩn
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide, notificationOpacity]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.notification,
        {opacity: notificationOpacity, backgroundColor},
      ]}>
      <Text style={[styles.notificationText, {color: textColor}]}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Notification;
