import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};

export default Layout;