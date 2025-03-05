import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Rides = () => {
	return (
		<SafeAreaView>
			<StatusBar hidden={true} /> 
			<Text>Rides</Text>
		</SafeAreaView>
	);
};

export default Rides;