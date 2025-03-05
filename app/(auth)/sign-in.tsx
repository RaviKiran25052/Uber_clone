import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const SignIn = () => {
	return (
		<SafeAreaView>
			<StatusBar hidden={true} />
			<Text>SignIn</Text>
		</SafeAreaView>
	);
};

export default SignIn;