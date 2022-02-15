import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { Colors } from "react-native-paper";
import { TopicProvider } from "../../contexts/topic";
import CreateTopicMaterialScreen from "../../screens/topic/CreateTopicMaterialScreen";
import TopicTabScreen from "../../screens/topic/TopicTabScreen";
import { TopicStackScreenProps, TopicTabParamList } from "../../types";

const BottomTab = createBottomTabNavigator<TopicTabParamList>();

export default function TopicBottomTabNavigator({
  route,
}: TopicStackScreenProps<"Topic">) {
  return (
    <TopicProvider topicId={route.params.topicId}>
      <BottomTab.Navigator
        initialRouteName="TopicTab"
        screenOptions={{
          tabBarActiveTintColor: Colors.deepPurpleA700,
        }}
      >
        <BottomTab.Screen
          name="TopicTab"
          component={TopicTabScreen}
          options={{
            title: "Topic",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="paste" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="CreateTopicMaterialTab"
          component={CreateTopicMaterialScreen}
          options={{
            title: "Create Study Material",
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </TopicProvider>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
