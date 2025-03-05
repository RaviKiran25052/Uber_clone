import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	return (
		<SafeAreaView className='bg-green-500 flex-1 justify-center items-center'>
			<StatusBar hidden={true} /> 
			<Text>Weclome..!</Text>
		</SafeAreaView>
	);
};

export default Home;