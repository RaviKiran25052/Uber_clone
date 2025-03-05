import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {

	const swiperRef = useRef<Swiper>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const isLastSlide = activeIndex === onboarding.length - 1;

	return (
		<SafeAreaView className="flex h-full pb-14 justify-between items-center bg-white">
			<StatusBar hidden={true} />
			<View className="w-full flex justify-end items-end pr-8">
				<TouchableOpacity
					onPress={() => {
						router.replace("/(auth)/sign-up");
					}}
				>
					<Text className="text-lg font-semibold">Skip</Text>
				</TouchableOpacity>
			</View>
			<Swiper
				ref={swiperRef}
				loop={false}
				dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
				activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
				onIndexChanged={(index) => setActiveIndex(index)}
			>
				{onboarding.map((item) => (
					<View
						key={item.id}
						className="h-full flex justify-center items-center px-8"
					>
						<Text className="text-3xl font-JakartaSemiBold text-center leading-normal">{item.title}</Text>
						<Image
							source={item.image}
							className="w-full h-[300px]"
							resizeMode="contain"
						/>
						<View className="flex items-center">
							<Text className="text-md text-center font-JakartaLight leading-6 mx-10 mt-3">{item.description}</Text>
						</View>
					</View>
				))}
			</Swiper>
			<CustomButton
				title={isLastSlide ? "Get Started" : "Next"}
				onPress={() => {
					isLastSlide
						? router.replace("/(auth)/sign-up")
						: swiperRef.current?.scrollBy(1)
				}}
				className="w-11/12 mt-10"
			/>
		</SafeAreaView>
	);
};

export default Welcome;