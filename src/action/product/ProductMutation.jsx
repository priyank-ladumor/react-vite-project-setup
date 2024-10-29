import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "./product";

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct) => {
      return await productsApi.update(updatedProduct.id, updatedProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allProducts"]); // Invalidate the query on success
    },
    onError: (error) => {
      console.error("Update product mutation failed", error);
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      return await productsApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allProducts"], { exact: true }); // Invalidate the query on success
    },
    onError: (error) => {
      console.error("Delete product mutation failed", error);
    },
  });

  return {
    updateProductMutation,
    deleteProductMutation,
  };
};
