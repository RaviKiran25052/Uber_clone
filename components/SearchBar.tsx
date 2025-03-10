import React from "react";
import { View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GoogleInputProps } from "@/types/type";
import 'react-native-get-random-values';

const googleAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const SearchBar = ({ handlePress, initialLocation }: GoogleInputProps) => {

	return (
		<View className="flex-row items-center bg-white mx-6 py-2 rounded-full shadow-md">
			<GooglePlacesAutocomplete
				fetchDetails={true}
				placeholder="Where do you want to go?"
				debounce={200}
				styles={{
					textInputContainer: {
						alignItems: "center",
						justifyContent: "center",
						marginHorizontal: 20,
					},
					textInput: {
						backgroundColor: "white",
						fontFamily: "Jakarta-SemiBold",
						fontSize: 16,
						marginTop: 5
					},
					listView: {
						backgroundColor: "white",
						position: "relative",
						top: 0,
						width: "100%",
						borderRadius: 10,
						shadowColor: "#d4d4d4",
						zIndex: 99
					}
				}}
				onPress={(data, details = null) => {
					handlePress({
						latitude: details?.geometry.location.lat!,
						longitude: details?.geometry.location.lng!,
						address: data.description
					});
					console.log(data, details);					
				}}
				query={{
					key: googleAPI,
					language: "en"
				}}
				renderLeftButton={() => (
					<Feather name="search" size={20} color="gray" className="mr-2" />
				)}
				textInputProps={{
					placeholderTextColor: "gray",
					placeholder: initialLocation ?? "Where do you want to go?"
				}}
			/>
		</View>
	);
};

export default SearchBar;
