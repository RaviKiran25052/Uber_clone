import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Chat = () => {
	return (
		<SafeAreaView>
			<StatusBar hidden={true} />
			<Text>Chat</Text>
		</SafeAreaView>
	);
};

export default Chat;