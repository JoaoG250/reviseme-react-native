import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { Colors } from "react-native-paper";
import { SubjectProvider } from "../../contexts/subject";
import SubjectRevisionsTabScreen from "../../screens/subject/SubjectRevisionsTabScreen";
import SubjectTopicsTabScreen from "../../screens/subject/SubjectTopicsTabScreen";
import { SubjectStackScreenProps, SubjectTabParamList } from "../../types";

const BottomTab = createBottomTabNavigator<SubjectTabParamList>();

export default function SubjectBottomTabNavigator({
  route,
}: SubjectStackScreenProps<"Subject">) {
  return (
    <SubjectProvider subjectId={route.params.subjectId}>
      <BottomTab.Navigator
        initialRouteName="SubjectRevisionsTab"
        screenOptions={{
          tabBarActiveTintColor: Colors.deepPurpleA700,
        }}
      >
        <BottomTab.Screen
          name="SubjectRevisionsTab"
          component={SubjectRevisionsTabScreen}
          options={{
            title: "Subject Revisions",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar-check-o" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="SubjectTopicsTab"
          component={SubjectTopicsTabScreen}
          options={{
            title: "Subject Topics",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="paste" color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </SubjectProvider>
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
