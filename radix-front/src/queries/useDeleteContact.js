import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact as deleteContactApi } from "../services/apiContacts";
import { toast } from "sonner";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  const { mutate: deleteContact, isLoading: isDeleting } = useMutation({
    mutationFn: deleteContactApi,
    onSuccess: () => {
      toast.success("Contact successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return { deleteContact, isDeleting };
}
