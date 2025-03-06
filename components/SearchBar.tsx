import React from "react";
import { View, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const SearchBar = () => {
	return (
		<View className="flex-row items-center bg-white mx-6 px-4 py-2 rounded-full shadow-md">
			<Feather name="search" size={20} color="gray" className="mr-2" />
			<TextInput
				placeholder="Where do you want to go?"
				className="flex-1 text-gray-700 text-base"
			/>
		</View>
	);
};

export default SearchBar;
