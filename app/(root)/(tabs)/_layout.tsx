import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="home" options={{ headerShown: false }} />
			<Stack.Screen name="chat" options={{ headerShown: false }} />
			<Stack.Screen name="rides" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;