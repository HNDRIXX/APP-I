import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constant";

export default TabsLayout = () => {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerTitleAlign: "center",
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === "home/index") {
          iconName = focused
            ? "ios-home"
            : "ios-home-outline"
        } else if (route.name === "movie/index") {
          iconName = focused ? 'play-forward' : 'play-forward-outline'
        }

        return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: COLORS.orange
    })}>
      <Tabs.Screen
        name="home/index" 
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="movie/index" 
        options={{
          title: "Movies",
        }}
      />
    </Tabs>
  )
}