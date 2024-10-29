import { Api } from "../../utils/axios";
import { createQueryKeys } from "@lukemorales/query-key-factory";

class Products extends Api {
  constructor() {
    super();
    this.baseUrl = "products";
  }

  getAll() {
    return this._all();
  }

  get(id) {
    return this._get(id);
  }

  delete(id) {
    return this._delete(id);
  }

  update(id, updatedProduct) {
    return this._update(id, updatedProduct);
  }
}

export const productsApi = new Products();

export const productQuery = createQueryKeys("products", {
  all: (config) => ({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const { data } = await productsApi.getAll(config);
      return data.products;
    },
  }),
  get: (id) => ({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await productsApi.get(id);
      return data;
    },
  }),
});
