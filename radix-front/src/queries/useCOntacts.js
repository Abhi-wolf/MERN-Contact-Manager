import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../services/apiContacts";

export function useContacts() {
  const {
    isLoading,
    error,
    data: contacts,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  return { isLoading, error, contacts };
}
