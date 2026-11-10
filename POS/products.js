
// ======================================
// KLYQ GROCERY POS
// SHARED PRODUCT MANAGEMENT
// ======================================

// GET ALL PRODUCTS
function getGPSProducts() {
    try {
        const products = JSON.parse(
            localStorage.getItem("gps_products")
        );

        return Array.isArray(products) ? products : [];

    } catch (error) {
        console.error("Error loading products:", error);
        return [];
    }
}


// SAVE PRODUCTS
function saveGPSProducts(products) {

    if (!Array.isArray(products)) {
        console.error("Invalid product data!");
        return false;
    }

    localStorage.setItem(
        "gps_products",
        JSON.stringify(products)
    );

    // Notify the current page
    window.dispatchEvent(
        new Event("gpsProductsUpdated")
    );

    return true;
}


// ADD NEW PRODUCT
function addGPSProduct(name, price, stock) {

    const products = getGPSProducts();

    name = String(name).trim();
    price = Number(price);
    stock = Number(stock);

    if (!name || !Number.isFinite(price) ||
        !Number.isInteger(stock) || price <= 0 || stock < 0) {
        alert("Please enter valid product information!");
        return false;
    }

    const existingProduct = products.find(product =>
        product.name.toLowerCase() === name.toLowerCase()
    );

    if (existingProduct) {
        alert("Product already exists!");
        return false;
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        stock: stock
    };

    products.push(newProduct);

    saveGPSProducts(products);

    alert("Product successfully added!");

    return newProduct;
}


// UPDATE PRODUCT
function updateGPSProduct(id, updatedData) {

    const products = getGPSProducts();

    const index = products.findIndex(
        product => String(product.id) === String(id)
    );

    if (index === -1) {
        alert("Product not found!");
        return false;
    }

    const name = String(updatedData.name ?? "").trim();
    const price = Number(updatedData.price);
    const stock = Number(updatedData.stock);

    if (!name || !Number.isFinite(price) ||
        !Number.isInteger(stock) || price <= 0 || stock < 0) {
        alert("Please enter valid product information!");
        return false;
    }

    products[index] = {
        ...products[index],
        name: name,
        price: price,
        stock: stock
    };

    saveGPSProducts(products);

    alert("Product successfully updated!");

    return true;
}


// DELETE PRODUCT
function deleteGPSProduct(id) {

    const products = getGPSProducts();

    const updatedProducts = products.filter(
        product => String(product.id) !== String(id)
    );

    if (updatedProducts.length === products.length) {
        alert("Product not found!");
        return false;
    }

    saveGPSProducts(updatedProducts);

    alert("Product successfully deleted!");

    return true;
}


// LISTEN FOR PRODUCT CHANGES
function onGPSProductsChanged(callback) {

    // Changes from another browser tab
    window.addEventListener("storage", function(event) {

        if (event.key === "gps_products") {
            callback(getGPSProducts());
        }

    });

    // Changes from the current page
    window.addEventListener("gpsProductsUpdated", function() {
        callback(getGPSProducts());
    });

}
