import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import * as Notifications from "expo-notifications";
import RootNavigation from "./Navigation/RootNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const first = useRef(1);
  const appState = useRef(AppState.currentState);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "ECom App",
        body: "The app is running in background",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2, repeats: false },
    });
  }

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    if (appState.current == "active" && first.current == 1) {
      await schedulePushNotification();
      first.current = 2;
    }
    appState.current = nextAppState;
    console.log("AppState", appState.current);
  };

  return (
    <RootNavigation>
      <StatusBar style="auto" />
    </RootNavigation>
  );
}
