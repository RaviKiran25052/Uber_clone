import { Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from '@/store';
import { calculateRegion } from '@/lib/map';

const Map = () => {
	const {
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude
	} = useLocationStore();

	const region = calculateRegion({userLatitude, userLongitude, destinationLatitude, destinationLongitude})

	return (
		<View className="mx-6 my-8 h-[300px] rounded-2xl overflow-hidden">
			<MapView
				provider={PROVIDER_DEFAULT}
				style={{ width: '100%', height: '100%', borderRadius: 20 }}
				mapType='terrain'
				showsPointsOfInterest={false}
				initialRegion={region}
				showsUserLocation={true}
			>
			</MapView>
		</View>
	)
}

export default Map