import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { router } from "expo-router";

const LogoutButton = () => {
	const { signOut } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		await signOut();
		setLoading(false);
		router.replace("/(auth)/sign-in");
	};

	return (
		<TouchableOpacity
			onPress={handleLogout}
			style={{
				backgroundColor: "#0286ff",
				padding: 12,
				borderRadius: 8,
				alignItems: "center",
			}}
		>
			{loading ? (
				<ActivityIndicator size="small" color="#fff" />
			) : (
				<Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Logout</Text>
			)}
		</TouchableOpacity>
	);
};

export default LogoutButton;
