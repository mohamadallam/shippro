export const parseObjectKeysFromArray = (arrayOfObject, filterType = null) => {
    let arr = [];
    if (
        Array.isArray(arrayOfObject) &&
        arrayOfObject.length > 0 &&
        typeof arrayOfObject[0] === "object" &&
        Object.keys(arrayOfObject[0]).length > 0
    ) {
        arr = Object.keys(arrayOfObject[0]);
    }
    if (filterType === "filterKeysName") {
        arr = filterKeysName(arr);
    }
    return arr;
};
export function filterKeysName(columns) {
    return columns.map((c) => {
        return filterKey(c);
    });
}
export function filterKey(c) {
    c = c.replaceAll("_", " ").trim();
    c = c.replaceAll("customer", "").trim();
    const c2 = c.charAt(0).toUpperCase() + c.slice(1);
    return c2;
}
export const filterForbiddenKey = (key, forbiddenKeys) => {
    return forbiddenKeys.some((f) => {
        f = filterKey(f).toLowerCase();
        key = key.toLowerCase();
        return f === key;
    });
};
