import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SignUp = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: ''
	});
	const onSignUpPress = async () => {

	}

	return (
		<ScrollView className="flex-1 bg-white">
			<StatusBar hidden={true} />
			<View className="flex-1">
				<View className="relative w-full h-[250px]">
					<Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
					<Text className="text-4xl text-black font-JakartaBold absolute bottom-0 left-5">
						Create Your Account
					</Text>
				</View>
				<View className="p-10">
					<InputField
						label="Name"
						placeholder="Enter your name"
						icon={icons.person}
						value={form.name}
						onChangeText={(value) => setForm({ ...form, name: value })}
					/>
					<InputField
						label="Email"
						placeholder="Enter your email"
						icon={icons.email}
						value={form.email}
						onChangeText={(value) => setForm({ ...form, email: value })}
					/>
					<InputField
						label="Password"
						placeholder="Enter your password"
						icon={icons.lock}
						secureTextEntry={true}
						value={form.password}
						onChangeText={(value) => setForm({ ...form, password: value })}
					/>
					<CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />
					<View className="mt-6 flex flex-row justify-center items-center">
						<Text className="text-general-200">Already have an account? </Text>
						<Link href="/sign-in" className="text-primary-500 font-JakartaSemiBold">Log in</Link>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default SignUp;