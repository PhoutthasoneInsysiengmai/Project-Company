import React, { useContext, useEffect } from "react";
import './Verify.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";

const Verify = () => {

    const [searchParms, setSearchParms] = useSearchParams();
    const success = searchParms.get("success")
    const orderId = searchParms.get("orderId")
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className="verify">
            <div className="spiner"></div>
        </div>
    )
}
export default Verify