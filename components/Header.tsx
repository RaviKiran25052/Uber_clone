import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { HeaderProps } from "@/types/type";
import { images } from "@/constants";

const Header = ({ username }: HeaderProps) => {
	const { signOut } = useAuth();

	const handleLogout = async () => {
		await signOut();
		router.replace("/(auth)/sign-in");
	};

	return (
		<View className="pl-10 pr-5 py-8 flex-row justify-between relative">
			{/* Welcome Text */}
			<View>
				<Text className="font-JakartaBold text-2xl text-gray-400 mb-2">Welcome back!</Text>
				<Text className="font-JakartaExtraBold capitalize text-3xl">{username}</Text>
			</View>

			{/* 3 Dots Dropdown Menu */}
			<TouchableOpacity onPress={handleLogout}>
				<Feather name="log-out" size={25} color="black"/>
			</TouchableOpacity>

			<Image source={images.rydo} className="absolute top-5 right-20 w-20 h-20" />
		</View>
	);
};

export default Header;
