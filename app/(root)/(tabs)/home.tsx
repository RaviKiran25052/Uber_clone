import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from '@clerk/clerk-expo';
import Ride from "@/components/RideCard";
import Header from "@/components/Header";
import EmptyRides from "@/components/EmptyRides";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import * as Location from "expo-location";

let recentRides = [
	{
		"ride_id": "1",
		"user_email": "ravivarma25052@gmail.com",
		"origin_address": "Kathmandu, Nepal",
		"destination_address": "Pokhara, Nepal",
		"origin_latitude": 27.717245,
		"origin_longitude": 85.323961,
		"destination_latitude": 28.209583,
		"destination_longitude": 83.985567,
		"ride_time": 391,
		"fare_price": 195.00,
		"payment_status": "pending",
		"driver_id": 2,
		"user_id": "1",
		"created_at": "2025-03-07 00:19:20.620007",
		"driver": {
			"driver_id": "2",
			"first_name": "David",
			"last_name": "Brown",
			"profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
			"vehicle_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
			"vehicle_seats": 5,
			"rating": "4.60"
		}
	},
	{
		"ride_id": "2",
		"user_email": "ravivarma25052@gmail.com",
		"origin_address": "Jalkot, MH",
		"destination_address": "Pune, Maharashtra, India",
		"origin_latitude": 18.609116,
		"origin_longitude": 77.165873,
		"destination_latitude": 18.520430,
		"destination_longitude": 73.856744,
		"ride_time": 491,
		"fare_price": 245.00,
		"payment_status": "cancelled",
		"driver_id": 1,
		"user_id": "1",
		"created_at": "2024-08-12 06:12:17.683046",
		"driver": {
			"driver_id": "1",
			"first_name": "James",
			"last_name": "Wilson",
			"profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
			"vehicle_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
			"vehicle_seats": 7,
			"rating": "4.80"
		}
	},
	{
		"ride_id": "3",
		"user_email": "ravivarma25052@gmail.com",
		"origin_address": "Zagreb, Croatia",
		"destination_address": "Rijeka, Croatia",
		"origin_latitude": 45.815011,
		"origin_longitude": 15.981919,
		"destination_latitude": 45.327063,
		"destination_longitude": 14.442176,
		"ride_time": 124,
		"fare_price": 62.00,
		"payment_status": "paid",
		"driver_id": 1,
		"user_id": "1",
		"created_at": "2024-08-12 08:49:01.809053",
		"driver": {
			"driver_id": "1",
			"first_name": "James",
			"last_name": "Wilson",
			"profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
			"vehicle_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
			"vehicle_seats": 1,
			"rating": "4.80"
		}
	},
	{
		"ride_id": "4",
		"user_email": "ravivarma25052@gmail.com",
		"origin_address": "Okayama, Japan",
		"destination_address": "Osaka, Japan",
		"origin_latitude": 34.655531,
		"origin_longitude": 133.919795,
		"destination_latitude": 34.693725,
		"destination_longitude": 135.502254,
		"ride_time": 159,
		"fare_price": 79.00,
		"payment_status": "paid",
		"driver_id": 3,
		"user_id": "1",
		"created_at": "2024-08-12 18:43:54.297838",
		"driver": {
			"driver_id": "3",
			"first_name": "Michael",
			"last_name": "Johnson",
			"profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
			"vehicle_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
			"vehicle_seats": 3,
			"rating": "4.70"
		}
	},
	{
		"ride_id": "5",
		"user_email": "ravivarma25052@gmail.com",
		"origin_address": "Zagreb, Croatia",
		"destination_address": "Rijeka, Croatia",
		"origin_latitude": 45.815011,
		"origin_longitude": 15.981919,
		"destination_latitude": 45.327063,
		"destination_longitude": 14.442176,
		"ride_time": 124,
		"fare_price": 62.00,
		"payment_status": "paid",
		"driver_id": 1,
		"user_id": "1",
		"created_at": "2025-03-02 08:49:01.809053",
		"driver": {
			"driver_id": "1",
			"first_name": "James",
			"last_name": "Wilson",
			"profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
			"vehicle_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
			"vehicle_seats": 1,
			"rating": "4.80"
		}
	}
]
// recentRides = [];

const Home = () => {

	const { user } = useUser();
	const {setUserLocation, setDestinationLocation} = useLocationStore();
	const [hasPermission, setHasPermission] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(()=> {
		const requestLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status != "granted") {
				setHasPermission(true);
				return;
			}

			let location = await Location.getCurrentPositionAsync();

			const address = await Location.reverseGeocodeAsync({
				latitude: location.coords?.latitude!,
				longitude: location.coords?.longitude!,
			});

			setUserLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				address: `${address[0].name} ${address[0].region}`,
			})
			console.log(`${address[0].name} ${address[0].region}`);
			
		};

		requestLocation();
	},[]);

	return (
		<SafeAreaView className="bg-gray-50 flex-1">
			<StatusBar hidden={true} />
			<Header username={user?.username as string} />
			<SearchBar handlePress={function ({ latitude, longitude, address, }: { latitude: number; longitude: number; address: string; }): void {
				throw new Error("Function not implemented.");
			} } />
			<Map />
			<FlatList
				data={recentRides?.slice(0, 5)}
				renderItem={({ item }) => <Ride ride={item} />}
				keyExtractor={(item) => item.ride_id}
				contentContainerStyle={[
					{ paddingHorizontal: 25, paddingBottom: 120 },
					recentRides?.length === 0 && { flexGrow: 1, justifyContent: "center", alignItems: "center" },
				]}
				ListEmptyComponent={<EmptyRides />}
				ListHeaderComponent={<Text className="text-md font-JakartaSemiBold text-gray-600 mb-2">Your recent rides:</Text>}
				ListFooterComponent={
					<Link href="/(root)/(tabs)/rides">
						{recentRides?.length != 0 &&
							<Text className="text-center font-JakartaSemiBold text-gray-500">See More</Text>}
					</Link>
				}
				ListFooterComponentStyle={{
					marginTop: 20
				}}
			/>
		</SafeAreaView>
	);
};

export default Home;