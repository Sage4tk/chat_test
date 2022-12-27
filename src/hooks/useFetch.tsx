import { useEffect, useState } from "react";

const useFetch:any = async (api:string, body:object | any) => {
    // set state
    const [items, setItems] = useState<any>();

    //fetch api
    const fetchApi = async () => {
        try {
            let res:any = await fetch(api, {
                method: "post",
                headers : {
                    "content-type": "application/json"
                },
                body
            });

            res = await res.json();

            setItems(res.data);
        } catch (err) {
            setItems(err)
        }
    }

    useEffect(() => {
        fetchApi(); 
    }, []);

    return items;
}

export default useFetch;