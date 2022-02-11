/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

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
        screens: {
          SubjectTopicTab: {
            path: "subjects/:subjectId/topics",
          },
          SubjectRevisionHistoryTab: {
            path: "subjects/:subjectId/revisions",
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
