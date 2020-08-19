
const authHeader = () => {
    const token = localStorage.getItem('token');

    if(token){
        return {
            Authorization: token
        };
    }
    return {};

}

export default authHeader;