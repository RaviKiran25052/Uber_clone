import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
	return (
		<SafeAreaView>
			<StatusBar hidden={true} /> 
			<Text>Profile</Text>
		</SafeAreaView>
	);
};

export default Profile;