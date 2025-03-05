import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

const OAuth = () => {

	const handleGoogleAuth = async () => {

	}

	return (
		<View>
			<View className='flex flex-row justify-center items-center gap-x-3 mt-4'>
				<View className='flex-1 h-[1px] bg-general-100' />
				<Text className='text-lg'>Or</Text>
				<View className='flex-1 h-[1px] bg-general-100' />
			</View>
			<CustomButton
				title='Log In with Google'
				className='mt-5 shadow-none'
				IconLeft={() => (
					<Image
						source={icons.google}
						resizeMode="contain"
						className='w-5 h-5 mx-2'
					/>
				)}
				bgVariant='outline'
				textVariant='primary'
				onPress={handleGoogleAuth}
			/>
		</View>
	)
}

export default OAuth