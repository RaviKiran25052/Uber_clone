import { icons } from "@/constants";
import { Stack, Tabs } from "expo-router";
import { Text, View } from "react-native";
import * as Icons from "react-native-vector-icons";

const TabIcon = ({ focused, source }: { focused: boolean, source: string }) => {

	const [library, iconName] = source.split("/");
	const IconComponent = Icons[library as keyof typeof Icons] as any;
	return (
		<View className="items-center justify-center">
			<View
				style={{
					width: 48,
					height: 48,
				}}
				className={`rounded-full items-center justify-center ${focused ? "bg-green-600" : "bg-transparent"}`}
			>
				<IconComponent name={iconName} size={24} color="#fff" />
			</View>
		</View>
	);
}

const Layout = () => {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "white",
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "#333333",
					borderRadius: 50,
					overflow: "hidden",
					marginHorizontal: 35,
					marginBottom: 35,
					display: "flex",
					height: 65,
					paddingBottom: 28,
					alignItems: "center",
					flexDirection: "row",
					position: "absolute"
				}
			}
			}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} source="Feather/home" />
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					title: "Chats",
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} source="Ionicons/chatbox-ellipses-outline" />
				}}
			/>
			<Tabs.Screen
				name="rides"
				options={{
					title: "Rides",
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} source="Octicons/history" />
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} source="Feather/user" />
				}}
			/>
		</Tabs>
	);
};

export default Layout;