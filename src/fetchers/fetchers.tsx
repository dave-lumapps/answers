import axios from 'axios';

export async function get<T>(
    path: string
): Promise<T> {
    const  data  = await axios.get(path);
    console.log("PATH " + path)
    console.log("DATA " + JSON.stringify(data))
    const body = await data.data
    console.log("BODY " + JSON.stringify(body))
    return body;
    
};
