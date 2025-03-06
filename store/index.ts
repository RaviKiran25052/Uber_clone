import { create } from "zustand";
import { LocationStore } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
	userAddress: null,
	userLatitude: null,
	userLongitude: null,
	destinationAddress: null,
	destinationLatitude: null,
	destinationLongitude: null,
	setUserLocation: ({ latitude, longitude, address }: { latitude: number, longitude: number, address: string }) => {
		set(() => ({
			userLatitude: latitude,
			userLongitude: longitude,
			userAddress: address,
		}))
	},
	setDestinationLocation: ({ latitude, longitude, address }: { latitude: number, longitude: number, address: string }) => {
		set(() => ({
			destinationLatitude: latitude,
			destinationLongitude: longitude,
			destinationAddress: address,
		}))
	},
}))