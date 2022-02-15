import { createContext, useContext, useEffect, useState } from "react";
import { Topic } from "../interfaces/Topic";
import { getTopic } from "../services/topic";

interface TopicContextType {
  loading: boolean;
  topic: Topic | undefined;
}

interface TopicProviderProps {
  children: React.ReactNode;
  topicId: number;
}

const TopicContext = createContext({} as TopicContextType);

export function TopicProvider({ children, topicId }: TopicProviderProps) {
  const [topic, setTopic] = useState<Topic>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getTopic(topicId);
      setTopic(response.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <TopicContext.Provider value={{ loading, topic }}>
      {children}
    </TopicContext.Provider>
  );
}

export function useTopic() {
  const context = useContext(TopicContext);

  if (!context) {
    throw new Error("useTopic must be used within an TopicProvider");
  }

  return context;
}
