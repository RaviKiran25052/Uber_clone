import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from "expo-router";

const Home = () => {

	const { user } = useUser();
	return (
		<SafeAreaView className='bg-green-500 flex-1 justify-center items-center'>
			<StatusBar hidden={true} />
			<SignedIn>
				<Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
			</SignedIn>
			<SignedOut>
				<Link href="/(auth)/sign-in">
					<Text>Sign in</Text>
				</Link>
				<Link href="/(auth)/sign-up">
					<Text>Sign up</Text>
				</Link>
			</SignedOut>
		</SafeAreaView>
	);
};

export default Home;