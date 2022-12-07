import React from "react";
import { Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import NotificationItem from "../components/notification/NotificationItem";

export default function Notifications() {
  return (
    <ScreenLayout>
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
    </ScreenLayout>
  );
}
