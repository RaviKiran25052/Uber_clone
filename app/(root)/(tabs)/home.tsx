import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from "expo-router";
import LogoutButton from "@/components/LogOutButton";

const Home = () => {

	const { user } = useUser();
	return (
		<SafeAreaView className='bg-white flex-1 justify-center items-center'>
			<StatusBar hidden={true} />
			<SignedIn>
				<Text className="mb-5">Hello {user?.emailAddresses[0].emailAddress}</Text>
				<LogoutButton/>
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