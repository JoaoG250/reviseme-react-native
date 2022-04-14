import { createContext, useContext, useEffect, useState } from "react";
import { Subject } from "../interfaces/Subject";
import { getSubject } from "../services/subject";

interface SubjectContextType {
  loading: boolean;
  subject: Subject | undefined;
}

interface SubjectProviderProps {
  children: React.ReactNode;
  subjectId: number;
}

const SubjectContext = createContext({} as SubjectContextType);

export function SubjectProvider({ children, subjectId }: SubjectProviderProps) {
  const [subject, setSubject] = useState<Subject>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getSubject(subjectId);
      setSubject(response.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <SubjectContext.Provider value={{ loading, subject }}>
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubject() {
  const context = useContext(SubjectContext);

  if (!context) {
    throw new Error("useSubject must be used within an SubjectProvider");
  }

  return context;
}
