export const getId = (name, type) => {
    if(type === "root") {
        return `/${name}`
    }
    else if (type === "child") {
        return `/${gettingChildFor}/${name}`
    } else {
        console.error("folder type not found");
    }
};