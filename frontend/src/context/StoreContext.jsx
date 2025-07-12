import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    // Add 
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    // Remove
    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] - 1
            }));

            if (token) {
                try {
                    await axios.post(`${url}/api/cart/remove`,
                        { itemId },
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                } catch (error) {
                    console.error("Error removing from cart:", error);
                    setCartItems((prev) => ({
                        ...prev,
                        [itemId]: prev[itemId] + 1
                    }));
                }
            }
        }
    }

    const loadCartData = async (token) => {
        if (token) {
            try {
                const res = await axios.post(`${url}/api/cart/get`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.success) {
                    setCartItems(res.data.cartData);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let TotalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                TotalAmount += itemInfo.price * cartItems[item];
            }
        }
        return TotalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }


    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken); // โหลด cart ทันทีหลังจาก token ได้
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext value={contextValue}>
            {props.children}
        </StoreContext>
    )
}
export default StoreContextProvider;