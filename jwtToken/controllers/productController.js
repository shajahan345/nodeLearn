import 'dotenv/config';
import axios from 'axios';

const getAllProducts = async (req, res) => {
    try {
        const { data, status } = await axios.get(`${process.env.PRODUCT_API}products`);
        if (status === 200) {
            return res.status(200).json({ message: "Success", data });
        }
        return res.status(status).json({ message: "Failed to fetch products", data: [] });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "id is required", data: [] })
        }

        const { data, status } = await axios.get(`${process.env.PRODUCT_API}products/${id}`);
        if (status !== 200) {
            return res.status(status).json({ message: "Failed to fetch product", data: [] });
        }
        return res.status(200).json({ message: "Success", data });
    } catch (err) {

    }
}
export { getAllProducts, getProductById }