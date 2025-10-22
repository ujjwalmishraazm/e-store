import { QueryKey, useMutation, useQueryClient, } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type DeleteMutationVariables = {
    ids: string[];
    deleteType: "PD" | "SD" | string;
};

type DeleteResponse = {
    success: boolean;
    message?: string;
    data?: unknown;
};

/**
 * A typed hook to delete or soft-delete media items.
 * @param queryKey - the react-query key (array) to invalidate on success
 * @param deleteEndpoint - API endpoint to call for deletion
 */
const useDeleteMutation = (queryKey:QueryKey, deleteEndpoint: string) => {
    const queryclient = useQueryClient();

    return useMutation<DeleteResponse, unknown, DeleteMutationVariables>({
        mutationFn: async ({ ids, deleteType }: DeleteMutationVariables) => {
            const { data: response } = await axios({
                url: deleteEndpoint,
                method: deleteType == "PD" ? "DELETE" : "PUT",
                data: { ids, deleteType },
            });

            if (!response?.success) {
                throw new Error(response?.message || "Delete failed");
            }
            return response as DeleteResponse;
        },
        onSuccess: () => {
            toast("success");
            queryclient.invalidateQueries({queryKey});
        },
        onError: () => {
            toast("error");
        },
    });
};

export default useDeleteMutation;
