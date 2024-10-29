import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useProductMutations } from "../../action/product/ProductMutation";
import { productQuery } from "../../action/product/product";

function Home() {
    const { deleteProductMutation } = useProductMutations();
    const [productDatas, setProductDatas] = useState([]);

    const { data, error, isLoading } = useQuery({
        ...productQuery.all(),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const { data } = await productsApi.getAll();
                // setProductDatas(data.products);
                if (data.length > 0) {
                    setProductDatas(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, window.location.href]);

    const handleRemove = async (id) => {
        try {
            await deleteProductMutation.mutate(id);
        } catch (error) {
            console.error(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {isLoading ? (
                <div style={{ border: "1px solid yellow", margin: "15px" }}>
                    Loading...
                </div>
            ) : (
                <div className="card">
                    {productDatas.length > 0 &&
                        productDatas.map((product) => (
                            <>
                                <div style={{ border: "1px solid black", margin: "15px" }}>
                                    <img
                                        src={product.images?.[0]}
                                        width={120}
                                        height={120}
                                        alt={product.name}
                                    />
                                    <h3>{product.title}</h3>
                                    <h3>{product.sku}</h3>
                                    <p>{product.price}</p>
                                    <p
                                        style={{ color: "red", cursor: "pointer" }}
                                        onClick={() => handleRemove(product.id)}
                                    >
                                        remove
                                    </p>
                                </div>
                            </>
                        ))}
                </div>
            )}
        </>
    );
}

export default Home;
