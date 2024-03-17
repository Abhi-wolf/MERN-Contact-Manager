import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContact as addContactApi } from "../services/apiContacts";
import { toast } from "sonner";

export function useAddContact() {
  const queryClient = useQueryClient();

  const { mutate: addContact, isLoading } = useMutation({
    mutationFn: addContactApi,
    onSuccess: () => {
      toast.success("Contact successfully added");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return { addContact, isLoading };
}
