import api from "../api";
import { Subject } from "../interfaces/Subject";

// Get all subjects
export async function getSubjects(queryParams?: {
  [key: string]: string | number | boolean;
}) {
  return api.get<Subject[]>("subjects/", {
    params: queryParams,
  });
}

// Get a single subject
export async function getSubject(id: number) {
  return api.get<Subject>(`subjects/${id}/`);
}
