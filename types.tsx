/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Param Lists

export type AuthStackParamList = {
  Login: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Subject: {
    subjectId: number;
  };
  Topic: {
    topicId: number;
  };
  Modal: undefined;
  NotFound: undefined;
};

export type RootTabParamList = {
  TopicRevisionsTab: undefined;
  SubjectsTab: undefined;
  RevisionHistoryTab: undefined;
};

export type SubjectTabParamList = {
  SubjectTopicsTab: undefined;
  SubjectRevisionsTab: undefined;
};

export type TopicTabParamList = {
  TopicTab: undefined;
  CreateTopicMaterialTab: undefined;
};

// Stack Screen Props

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type SubjectStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type TopicStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

// Tab Screen Props

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type SubjectTabScreenProps<Screen extends keyof SubjectTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SubjectTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type TopicTabScreenProps<Screen extends keyof TopicTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TopicTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
