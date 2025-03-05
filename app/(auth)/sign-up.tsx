import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";

const SignUp = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const [verification, setVerification] = useState({
		state: "defualt",
		error: "",
		code: "",
	})
	const router = useRouter();
	const { isLoaded, signUp, setActive } = useSignUp();
	const [showPassword, setShowPassword] = useState(false);
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSignUpPress = async () => {
		if (!isLoaded) return;

		if (form.password !== form.confirmPassword) {
			setShowError(true);
			return;
		}
		try {
			await signUp.create({
				emailAddress: form.email,
				password: form.password,
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
			setVerification({
				...verification,
				state: "pending"
			});
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	const onVerifyPress = async () => {
		if (!isLoaded) return;

		setIsLoading(true);
		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code: verification.code,
			});

			if (signUpAttempt.status === "complete") {
				// to-do create user in database
				await setActive({ session: signUpAttempt.createdSessionId });
				setVerification({
					...verification,
					state: "success",
					code: "",
				});
			} else {
				setVerification({
					...verification,
					state: "failed",
					error: "Invalid verification code."
				});
			}
		} catch (err: any) {
			setVerification({
				...verification,
				state: "failed",
				error: err.errors[0].longMessage,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView className="flex-1 bg-white">
			<StatusBar hidden={true} />
			<View className="relative w-full h-[250px]">
				<Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
				<Text className="text-4xl text-black font-JakartaBold absolute bottom-0 left-5">
					Create Your Account
				</Text>
			</View>
			<View className="p-10">
				<View className="mb-3">
					<Text className="text-gray-600 mb-1 font-medium">Name</Text>
					<View className="w-full flex flex-row items-center bg-white px-4 py-1 rounded-2xl border border-gray-300">
						<Feather name="user" size={20} color="gray" className="mr-2" />
						<TextInput
							className="flex-1 text-gray-700"
							placeholder="Enter your name"
							value={form.name}
							onChangeText={(value) => setForm({ ...form, name: value })}
						/>
					</View>
				</View>
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
							value={form.email}
							onChangeText={(value) => setForm({ ...form, email: value })}
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
				{/* Confirm Password Field */}
				<View className="mb-3">
					<Text className="text-gray-600 mb-1 font-medium">Confirm Password</Text>
					<View className="w-full flex flex-row items-center bg-white px-4 py-1 rounded-2xl border border-gray-300">
						<Feather name="lock" size={20} color="gray" className="mr-2" />
						<TextInput
							className="flex-1 text-gray-700"
							placeholder="Confirm password"
							secureTextEntry={!showPassword}
							value={form.confirmPassword}
							onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
						/>
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
							<Feather name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
						</TouchableOpacity>
					</View>
					<CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />
					<OAuth />
					<View className="mt-6 flex flex-row justify-center items-center">
						<Text className="text-general-200">Already have an account? </Text>
						<Link href="/sign-in" className="text-primary-500 font-JakartaSemiBold">Log in</Link>
					</View>
				</View>
			</View>
			<Modal isVisible={["pending", "failed"].includes(verification.state)} backdropOpacity={0.6} useNativeDriver>
				<View className="absolute inset-0 flex items-center justify-center bg-transparent">
					<View className="w-5/6 bg-white p-6 rounded-lg shadow-lg">
						<Text className="text-xl font-semibold text-center mb-4">Verify Your Email</Text>
						<Text className="text-gray-600 text-center mb-6">Check your mail for the verification code.</Text>
						<TextInput
							className={`w-full bg-gray-100 p-3 rounded-lg border ${verification.error ? "border-red-500" : "border-gray-300"} mb-3 text-gray-700`}
							value={verification.code}
							placeholder="Enter verification code"
							onChangeText={(text) => {
								setVerification({
									...verification,
									code: text,
									error: ""
								});
							}}
						/>
						{verification.error && verification.state == "failed" ? <Text className="text-red-500 text-center mb-2">{verification.error}</Text> : null}
						{/* Buttons */}
						<View className="flex flex-row justify-between">
							<TouchableOpacity
								className="flex-1 bg-gray-300 p-3 rounded-lg mr-2"
								onPress={() => setVerification({
									...verification,
									code: "",
									state: "default"
								})}
							>
								<Text className="text-center text-gray-700 font-medium">Close</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => { isLoading ? null : onVerifyPress() }}
								className={`flex-1 bg-primary-500 p-3 rounded-lg ml-2 ${isLoading ? "opacity-70" : ""}`}
								disabled={isLoading}
							>
								{isLoading ? (
									<ActivityIndicator size="small" color="#ffffff" />
								) : (
									<Text className="text-center text-white font-medium">Verify Now</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<Modal
				isVisible={verification.state === "success"}
				backdropOpacity={0.6}
				useNativeDriver
			>
				<View className="absolute inset-0 flex items-center justify-center bg-transparent">
					<View className="w-4/5 bg-white p-6 rounded-2xl shadow-lg items-center">
						<Octicons name="verified" size={60} color="green" />
						<Text className="text-2xl font-semibold text-center text-gray-800 mt-4">
							Verification Successful!
						</Text>
						<Text className="text-gray-600 text-center mt-2 mb-6">
							Your account has been successfully verified.
						</Text>

						{/* Go to Home Button */}
						<TouchableOpacity
							className="w-full bg-green-600 py-3 rounded-lg active:bg-green-700"
							onPress={() => {
								setVerification({
									state: "default",
									code: "",
									error: ""
								})
								setForm({
									name: "",
									email: "",
									password: "",
									confirmPassword: ""
								});
								router.replace("/(root)/(tabs)/home");
							}}
						>
							<Text className="text-center text-white font-medium">Go to Home</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Modal isVisible={showError} backdropOpacity={0.6} useNativeDriver>
				<View className="bg-white p-6 rounded-lg shadow-lg items-center">
					<View className="flex flex-row items-center gap-x-3">
						<AntDesign name="warning" size={40} color="red" className="mb-3" />
						<Text className="text-xl font-semibold text-center mb-4 text-red-600">Passwords Mismatch</Text>
					</View>
					<Text className="text-center mb-6 text-md">
						Please check your password.
					</Text>

					{/* Close Button */}
					<TouchableOpacity
						className="bg-red-500 px-6 py-3 rounded-lg"
						onPress={() => setShowError(false)}
					>
						<Text className="text-white font-medium text-center">OK</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</ScrollView>
	);
};

export default SignUp;