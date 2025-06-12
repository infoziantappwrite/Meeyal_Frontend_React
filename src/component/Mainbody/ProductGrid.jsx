import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';


const AdminAPI = import.meta.env.VITE_Admin_API_URL || process.env.REACT_APP_ADMIN_API;

const ProductGrid = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [banneriSaree, setbanneriSaree] = useState([]);
    const [SilkSaree, setSilkSaree] = useState([]);

    console.log(products);


    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${AdminAPI}/api/products`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const fetchedProducts = data.map((doc) => {
                    let imageUrl = "https://dummyimage.com/300";
                    if (Array.isArray(doc.productImages) && doc.productImages.length > 0) {
                        imageUrl = doc.productImages[0]?.imageUrl || imageUrl;
                    }

                    return {
                        id: doc._id,
                        title: doc.productName,
                        description: doc.details,
                        discountPrice: doc.discountPrice,
                        originalPrice: doc.originalPrice,
                        stock: doc.stock,
                        status: doc.status,
                        sold: doc.sold,
                        createdAt: doc.createdAt,
                        updatedAt: doc.updatedAt,
                        image: imageUrl,
                        category: doc.category?.name || "Uncategorized",
                        subcategory: doc.subCategory?.name || "Uncategorized",
                        productImages: doc.productImages.map((img) => img.imageUrl),
                    };
                });

                setProducts(fetchedProducts);

                const filteredBanarasi = fetchedProducts
                    .filter((product) => product.category.toLowerCase() === "banarasi saree")
                    .sort(
                        (a, b) =>
                            new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
                    );


                setbanneriSaree(filteredBanarasi);

                const filteredSilk = fetchedProducts
                    .filter((product) => product.category.toLowerCase() === "demo")
                    .sort(
                        (a, b) =>
                            new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
                    );

                setSilkSaree(filteredSilk);


            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products. Please try again later.");
                toast.error("Error fetching products.");
            } finally {
                setLoading(false); // Set loading to false after fetch attempt
            }
        };

        fetchAllProducts();
    }, []); // The empty dependency array ensures this runs only once on mount

    if (loading) {
        return (
            <div className="px-4 sm:px-8 lg:px-16 py-10 text-center">
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-4 sm:px-8 lg:px-16 py-10 text-center text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div >
            <div style={{ backgroundColor: '#F9F6F1', marginTop: '80px', padding: '40px 0' }}>
                <h2 className="text-6xl sm:text-5xl font-bold text-center text-[#8E1616] tracking-wide mb-10">
                    Weaves - Banarasi Saree
                </h2>
                {banneriSaree.length === 0 ? (
                    <p className="text-center text-gray-600">No products found.</p>
                ) : (
                    <ProductCard productsTotal={banneriSaree.slice(0, 4)} backgroundColor="#F9F6F1"/>
                )}
            </div>


            <div style={{ marginTop: '80px' }}>
                <h2 className="text-7xl sm:text-5xl font-bold text-center text-[#8E1616] tracking-wide mb-10">
                    Weaves - Silk Saree
                </h2>
                {banneriSaree.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <ProductCard productsTotal={SilkSaree.slice(0, 4)} />
                )}
            </div>

               <div style={{ backgroundColor: '#F9F6F1', marginTop: '80px', padding: '40px 0' }}>
                <h2 className="text-6xl sm:text-5xl font-bold text-center text-[#8E1616] tracking-wide mb-10">
                    Weaves - Banarasi Saree
                </h2>
                {banneriSaree.length === 0 ? (
                    <p className="text-center text-gray-600">No products found.</p>
                ) : (
                    <ProductCard productsTotal={banneriSaree.slice(0, 4)} backgroundColor="#F9F6F1"/>
                )}
            </div>


            <div style={{ marginTop: '80px' }}>
                <h2 className="text-7xl sm:text-5xl font-bold text-center text-[#8E1616] tracking-wide mb-10">
                    Weaves - Silk Saree
                </h2>
                {banneriSaree.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <ProductCard productsTotal={SilkSaree.slice(0, 4)} />
                )}
            </div>
        </div>

    );

};

export default ProductGrid;