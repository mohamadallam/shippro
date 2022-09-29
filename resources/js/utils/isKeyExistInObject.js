export function isKeyExistInObject(object, key, prefix = "input.") {
    let isExist = Boolean(object && key in object);
    if (!isExist) {
        key = prefix + key;
        isExist = Boolean(object && key in object);
    }

    const value = isExist ? object[key] : null;
    return { isExist, value };
}
