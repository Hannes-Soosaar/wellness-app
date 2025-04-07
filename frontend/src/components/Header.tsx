import React,{userEffect,userState, userContext, useEffect} from "react";
import api from "../lib/axios";


const Header: React.FC = () => {

const authToken = localStorage.getItem("authToken");

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();


}

}

