import * as React from "react";
import * as Linking from "expo-linking";
import Routes from "./routes";

import { AuthProvider } from "../contexts/auth";
import { RootStackParamList } from "../types";
import { LinkingOptions } from "@react-navigation/native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

export default function Navigation() {
  return (
    <NavigationContainer linking={linking} theme={DefaultTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TopicRevisionsTab: {
            path: "revisions",
          },
          SubjectsTab: {
            path: "subjects",
          },
          RevisionHistoryTab: {
            path: "history",
          },
        },
      },
      Subject: {
        path: "subjects/:subjectId",
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};
