import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Pressable } from "react-native";

import { Colors } from "react-native-paper";
import SubjectsTabScreen from "../../screens/root/SubjectsTabScreen";
import TopicRevisionsTabScreen from "../../screens/root/TopicRevisionsTabScreen";
import RevisionHistoryTabScreen from "../../screens/root/RevisionHistoryTabScreen";
import { RootTabParamList, RootTabScreenProps } from "../../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function RootBottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="SubjectsTab"
      screenOptions={{
        tabBarActiveTintColor: Colors.deepPurpleA700,
      }}
    >
      <BottomTab.Screen
        name="TopicRevisionsTab"
        component={TopicRevisionsTabScreen}
        options={{
          title: "Revisions",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-check-o" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SubjectsTab"
        component={SubjectsTabScreen}
        options={({ navigation }: RootTabScreenProps<"SubjectsTab">) => ({
          title: "Subjects",
          tabBarIcon: ({ color }) => <TabBarIcon name="paste" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors.black}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="RevisionHistoryTab"
        component={RevisionHistoryTabScreen}
        options={{
          title: "History",
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
