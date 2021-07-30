import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key) => {
    try {
        let data = await retrieveData(key)
        if (data === null || data === undefined) {
            // Do APi call here
            data = tempData
            await storeData(key, tempData)
        }
        return data 
    } catch (error) {
        return []
    }
}

/**
 * 
 *  common method localstorage 
 * 
 */
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.log(err)
        return null
    }
};

export const retrieveData = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key);
        if (value !== null) {
            value = JSON.parse(value)
        }
        return value
    } catch (error) {
        console.log(err)
        return null
    }
};

export const clearAllData = async () => {
    AsyncStorage.clear();
}