import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const EmptyRides = () => {
	function onBookRide() {
		console.log("Navigate to booking");
	}

	return (
		<View className="flex items-center justify-center h-60">
			<MaterialIcons name="error" size={80} color="gray" className=""/>
			<Text className="text-3xl text-black font-JakartaExtraBold my-2">OOPs..!</Text>
			<Text className="text-lg text-gray-600 font-Jakarta mb-6">No recent rides found</Text>
			<TouchableOpacity
				onPress={onBookRide}
				className="bg-black rounded-xl px-6 py-4"
			>
				<Text className="text-white font-JakartaBold">Book a Ride</Text>
			</TouchableOpacity>
		</View>
	);
};
export default EmptyRides;
