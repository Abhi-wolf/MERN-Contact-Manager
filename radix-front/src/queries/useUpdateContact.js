import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContact as updateContactApi } from "../services/apiContacts";
import { toast } from "sonner";

export function useUpdateContact() {
  const queryClient = useQueryClient();

  const { mutate: updateContact, isLoading: isUpdating } = useMutation({
    mutationFn: updateContactApi,
    onSuccess: () => {
      toast.success("Contact successfully updated");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return { updateContact, isUpdating };
}
