import React from "react";
import { View, Text, Image } from "react-native";
import { Ride } from "@/types/type";
import { vehicleImages } from "@/constants";
import Feather from "react-native-vector-icons/Feather";

const getTimeAgo = (date: Date) => {
	const diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
	if (diff < 60) return "now";
	if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
	if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
	const formattedDate = new Date(date).toLocaleDateString('en-GB');
	return formattedDate;
};

const getVehicleImage = (seats: number) => {
	if (seats === 1) return vehicleImages.bike;
	if (seats > 1 && seats < 5) return vehicleImages.auto;
	if (seats >= 5 && seats < 6) return vehicleImages.car;
	return vehicleImages.van;
};

const formatRideTime = (ride_time: number) => {
	const hours = Math.floor(ride_time / 60);
	const minutes = ride_time % 60;

	return hours > 0 ? `${hours} hrs ${minutes} min` : `${minutes} min`;
};

const RideCard = ({ ride: {
	origin_address,
	destination_address,
	destination_latitude,
	destination_longitude,
	ride_time,
	fare_price,
	payment_status,
	created_at,
	driver
} }: { ride: Ride }) => {

	const timeAgo = getTimeAgo(new Date(created_at));
	const vehicleImage = getVehicleImage(driver.vehicle_seats);
	const travelTime = formatRideTime(ride_time);

	return (
		<View className="flex flex-row items-center bg-white p-3 rounded-lg shadow-md my-3">
			<Image
				source={{ uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=18&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}` }}
				className="w-[80px] h-[90px] rounded-lg mr-3"
			/>
			<View className="flex-1">
				<View className="flex flex-row items-center">
					<Feather name="map-pin" size={16} color="#000" className="mr-2" />
					<Text className="text-lg font-JakartaBold pb-1" numberOfLines={1}>
						{destination_address}
					</Text>
				</View>
				<View className="flex flex-row items-end mb-1">
					<Text>Fare: ₹{fare_price} • </Text>
					<Text
						className={`font-JakartaSemiBold ${payment_status === "pending" ? "text-yellow-500" :
								payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
					>
						{payment_status}
					</Text>
				</View>
				<View className="flex flex-row justify-between items-center">
					<Text className="text-gray-500 text-sm">{timeAgo}</Text>
					<Text className="text-gray-500 text-sm">{travelTime}</Text>
				</View>
			</View>
			<Image source={vehicleImage} className="w-16 h-16 ml-3" />
		</View>
	);
};

export default RideCard;
