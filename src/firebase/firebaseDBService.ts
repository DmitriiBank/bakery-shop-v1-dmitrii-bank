import {
    doc,
    collection,
    getDoc,
    setDoc,
    deleteDoc,
    getCountFromServer
} from 'firebase/firestore'
import {db} from "../configurations/firebase-config";
import type {Category, ProductType} from "../utils/shop-types";
import {getRandomNumber} from "../utils/tools";
import productConfig from "../configurations/products-config.json"
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore"

const prodColl = collection(db, "product_collection");
const categoryColl = collection(db, "category");


export const addProduct = async (product: ProductType) => {
    product.id = getRandomNumber(10000, 99999) + "";
    const ref = doc(prodColl, product.id);
    await setDoc(ref, product);
}

export const addCategory = async (category: Category) => {
    const ref = doc(categoryColl, category.category_name);
    await setDoc(ref, category);
}

export const removeProduct = async (id: string) => {
    const ref = doc(prodColl, id);
    const removed = await getDoc(ref);
    console.log(removed.data());
    await deleteDoc(ref);
    return removed;
}

export const removeCategory = async (name: string) => {
    const ref = doc(categoryColl, name);
    const removed = await getDoc(ref);
    console.log(removed.data());
    await deleteDoc(ref);
    return removed;
}

export const getProduct = async (id: string) => {
    const ref = doc(prodColl, id);
    return await getDoc(ref);
}

// export const isCategoryExists = async (name: string) => {
//     const ref = doc(prodColl, name);
//     const res = await getDoc(ref);
//     return res.exists()
// }

export const isCategoryExists = async (name: string) => {
    const found = productConfig.some(product => product.name.includes(name));
    return found;
};


export const setProducts = async () => {
    let count = (await getCountFromServer(prodColl)).data().count;
    if (count === 0) {
        const products: ProductType[] = productConfig.map(product => (
            {
                title: product.name,
                category: product.name.split('-')[0],
                unit: product.unit,
                cost: product.cost,
                image: product.name + '.jpg',

            }
        ));
        for (let i = 0; i < products.length; i++) {
            const temp = await isCategoryExists(products[i].category);
            if (!temp)
                await addCategory({category_name: products[i].category});
            await addProduct(products[i]);
            count++
            console.log(count)
        }
    }
    return count;
}

export const getProducts = ():Observable<ProductType[]> => {
    return collectionData(prodColl) as Observable<ProductType[]>
}
