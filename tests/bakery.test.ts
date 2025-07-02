import {div, echo, getRandomNumber, reverseArray} from "../src/utils/tools";
import {
    addCategory,
    isCategoryExists,
    removeCategory
} from "../src/firebase/firebaseDBService";
import { getApps, deleteApp } from 'firebase/app';
import productConfig from '../src/configurations/products-config.json';

describe('BakeryShop.tools', () => {

    let arr:number[];

    beforeEach(() => {
        arr = [1,2,3]
    })

    test('getRandomNumber test', () => {
        expect(getRandomNumber(1,1)).toBe(1);
        expect(getRandomNumber(1,10)).toBeLessThan(10)
        expect(getRandomNumber(9,10)).toBe(9);
    })

    test('reverse array', () => {
        expect(reverseArray(arr)).toEqual([3,2,1])
    })

    test('div', () =>{
        expect(div(10,5)).toBe(2);
        expect(div(12,5)).not.toBe(2);
        expect(() => div(10,0)).toThrow("Dividing by zero!");
    })

    test("async function echo", () => {
        expect(echo("Hello")).resolves.toBe("Hello");
        expect(() => echo("Hello")).rejects.toThrow("Error");
    })

    test("async function echo", () => {
        echo("Hello").then((data) => expect(data).toBe("Hello"))
    })
})

describe('BakeryShop.dbService', () => {
    const newCategory = { category_name: 'beer' };

    afterAll(async () => {
        await Promise.all(getApps().map(deleteApp));
    });
    test('isCategoryExists', async () => {
        await expect(isCategoryExists('bread')).resolves.toBeTruthy()
        await expect(isCategoryExists('milk')).resolves.not.toBeTruthy()
    })

    test('All categories exist', async () => {
        const categoryNames = productConfig.map(p => p.name.split('-')[0]);

        const existsArray = await Promise.all(
            categoryNames.map(name => isCategoryExists(name))
        );

        expect(existsArray.every(Boolean)).toBeTruthy();
    });

    test('addCategory', async () => {
        await expect(isCategoryExists(newCategory.category_name)).resolves.not.toBeTruthy()
        await expect(addCategory(newCategory)).resolves.toBeUndefined()
        await expect(addCategory(newCategory)).rejects.toThrow('Category already exists!');
        await expect(addCategory({ category_name: '' })).rejects.toThrow()
        await expect(isCategoryExists(newCategory.category_name)).resolves.toBeTruthy()
    })
    test('removeCategory', async() => {
        await expect(isCategoryExists(newCategory.category_name)).resolves.toBeTruthy()
        await expect(removeCategory(newCategory.category_name)).resolves.toBeTruthy()
        await expect(isCategoryExists(newCategory.category_name)).resolves.not.toBeTruthy()
    })
})