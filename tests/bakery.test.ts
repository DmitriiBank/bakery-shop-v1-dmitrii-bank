import {div, echo, getRandomNumber, reverseArray} from "../src/utils/tools";
import {isCategoryExists} from "../src/firebase/firebaseDBService";

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
    test('isCategoryExists', async () => {
        await expect(isCategoryExists('bread')).resolves.toBeTruthy();
        await expect(isCategoryExists('milk')).resolves.toBeFalsy();
        await expect(isCategoryExists('cake')).resolves.toBeTruthy();
    });
});
