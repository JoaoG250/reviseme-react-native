import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { Colors } from "react-native-paper";
import SubjectRevisionHistoryTabScreen from "../../screens/subject/SubjectRevisionHistoryTabScreen";
import SubjectTopicTabScreen from "../../screens/subject/SubjectTopicTabScreen";
import { SubjectTabParamList } from "../../types";

const BottomTab = createBottomTabNavigator<SubjectTabParamList>();

export default function SubjectBottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="SubjectTopicTab"
      screenOptions={{
        tabBarActiveTintColor: Colors.deepPurpleA700,
      }}
    >
      <BottomTab.Screen
        name="SubjectTopicTab"
        component={SubjectTopicTabScreen}
        options={{
          title: "Subject Topics",
          tabBarIcon: ({ color }) => <TabBarIcon name="paste" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SubjectRevisionHistoryTab"
        component={SubjectRevisionHistoryTabScreen}
        options={{
          title: "Topic History",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
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
