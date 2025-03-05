import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import Feather from "react-native-vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
	const [form, setForm] = useState({
		emailAddress: '',
		password: ''
	});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);


	const { signIn, setActive, isLoaded } = useSignIn()
	const router = useRouter()

	const onSignInPress = async () => {
		if (!isLoaded) return
		setLoading(true);

		const { emailAddress, password } = form;
		console.log('====================================');
		console.log(form);
		console.log('====================================');
		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			})
			console.log('====================================');
			console.log(signInAttempt);
			console.log('====================================');
			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace('/(root)/(tabs)/home');
			} else {
				console.error(JSON.stringify(signInAttempt, null, 2))
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2))
		} finally {
			setLoading(false);
		}
	}

	return (
		<ScrollView className="flex-1 bg-white">
			<StatusBar hidden={true} />
			<View className="flex-1">
				<View className="relative w-full h-[250px]">
					<Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
					<Text className="text-4xl text-black font-JakartaBold absolute bottom-0 left-5">
						Welcome
					</Text>
				</View>
				<View className="p-10">
					{/* Email Field */}
					<View className="mb-3">
						<Text className="text-gray-600 mb-1 font-medium">Email</Text>
						<View className="w-full flex flex-row items-center bg-white px-4 py-1 rounded-2xl border border-gray-300">
							<Feather name="mail" size={20} color="gray" className="mr-2" />
							<TextInput
								className="flex-1 text-gray-700"
								placeholder="Enter your email"
								autoCapitalize="none"
								keyboardType="email-address"
								value={form.emailAddress}
								onChangeText={(value) => setForm({ ...form, emailAddress: value })}
							/>
						</View>
					</View>
					{/* Password Field */}
					<View className="mb-3">
						<Text className="text-gray-600 mb-1 font-medium">Password</Text>
						<View className="w-full flex flex-row items-center bg-white px-4 py-1 rounded-2xl border border-gray-300">
							<Feather name="lock" size={20} color="gray" className="mr-2" />
							<TextInput
								className="flex-1 text-gray-700"
								placeholder="Enter password"
								secureTextEntry={!showPassword}
								value={form.password}
								onChangeText={(value) => setForm({ ...form, password: value })}
							/>
							<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
								<Feather name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
							</TouchableOpacity>
						</View>
					</View>
					<TouchableOpacity
						onPress={onSignInPress}
						disabled={loading}
						className={`bg-[#0286ff] px-6 py-4 mt-6 rounded-2xl flex-row justify-center items-center ${loading ? "opacity-70" : ""}`}
					>
						{loading ? (
							<ActivityIndicator size="small" color="#fff" />
						) : (
							<Text
								className="text-white font-JakartaSemiBold text-lg text-center"
								disabled={loading}
							>Sign In</Text>
						)}
					</TouchableOpacity>
					<OAuth />
					<View className="mt-6 flex flex-row justify-center items-center">
						<Text className="text-general-200">Don't have an account? </Text>
						<Link href="/sign-up" className="text-primary-500 font-JakartaSemiBold">Sign Up</Link>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default SignIn;