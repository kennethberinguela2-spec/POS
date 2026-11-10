
const GPS_PRODUCT_KEY = "gps_products";

// GET PRODUCTS
function getGPSProducts() {
    try {
        const products = JSON.parse(
            localStorage.getItem(GPS_PRODUCT_KEY) || "[]"
        );

        return Array.isArray(products) ? products : [];

    } catch (error) {
        console.error("Loading error:", error);
        return [];
    }
}

// SAVE PRODUCTS
function saveGPSProducts(products) {

    if (!Array.isArray(products)) return false;

    try {
        localStorage.setItem(
            GPS_PRODUCT_KEY,
            JSON.stringify(products)
        );

        window.dispatchEvent(
            new CustomEvent("gpsProductsUpdated", {
                detail: products
            })
        );

        return true;

    } catch (error) {
        console.error("Saving error:", error);
        alert("Unable to save products!");
        return false;
    }
}

// ADD PRODUCT
function addGPSProduct(name, price, stock) {

    const products = getGPSProducts();

    name = String(name ?? "").trim();
    price = Number(price);
    stock = Number(stock);

    if (
        !name ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        alert("Please enter valid product information!");
        return false;
    }

    const duplicate = products.some(product =>
        String(product.name).trim().toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
        alert("Product already exists!");
        return false;
    }

    const newProduct = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
        name: name,
        price: price,
        stock: stock
    };

    products.push(newProduct);

    if (!saveGPSProducts(products)) {
        return false;
    }

    return newProduct;
}

// UPDATE PRODUCT
function updateGPSProduct(id, updatedData) {

    const products = getGPSProducts();

    const index = products.findIndex(
        product => String(product.id) === String(id)
    );

    if (index === -1) return false;

    const name = String(updatedData.name ?? "").trim();
    const price = Number(updatedData.price);
    const stock = Number(updatedData.stock);

    if (
        !name ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        alert("Invalid product information!");
        return false;
    }

    const duplicate = products.some((product, i) =>
        i !== index &&
        String(product.name).trim().toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
        alert("Product name already exists!");
        return false;
    }

    products[index] = {
        ...products[index],
        name: name,
        price: price,
        stock: stock
    };

    return saveGPSProducts(products);
}

// DELETE PRODUCT
function deleteGPSProduct(id) {

    const products = getGPSProducts();

    const updatedProducts = products.filter(
        product => String(product.id) !== String(id)
    );

    if (updatedProducts.length === products.length) {
        return false;
    }

    return saveGPSProducts(updatedProducts);
}

// LISTEN FOR CHANGES
function onGPSProductsChanged(callback) {

    window.addEventListener("gpsProductsUpdated", function() {
        callback(getGPSProducts());
    });

    window.addEventListener("storage", function(event) {

        if (event.key === GPS_PRODUCT_KEY) {
            callback(getGPSProducts());
        }

    });
}
