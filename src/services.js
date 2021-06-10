import AsyncStorage from "@react-native-async-storage/async-storage";

const answer =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const tempData = [
    {
        category: "Richard McClintock Naveen",
        qAndA: Array(10).fill({
            ques: "What is Lorem Ipsum? Why do we use it?",
            ans: answer,
            code: "codes",
        }),
    },
    {
        category: " Lorem Ipsum",
        qAndA: Array(10).fill({
            ques: "Where can I get some?",
            ans: answer,
            code: "codes",
        }),
    },
    {
        category: "on the theory of ethics",
        qAndA: Array(10).fill({
            ques: "The standard Lorem Ipsum passage, used since the 1500s",
            ans: answer,
            code: "codes",
        }),
    },
    {
        category: "it amet, consectetur",
        qAndA: Array(10).fill({
            ques: "The standard Lorem Ipsum passage, used since the 1500s",
            ans: answer,
            code: "codes",
        }),
    },
    {
        category: "Finibus Bonorum",
        qAndA: Array(10).fill({
            ques: "The standard Lorem Ipsum passage, used since the 1500s",
            ans: answer,
            code: "codes",
        }),
    },
];


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
const storeData = async (key, value) => {
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

const retrieveData = async (key) => {
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