import { Router } from 'express';
import { FunctionHelper } from '../functions/function.helper';
import schemeMPLList from '../mpl.json';
import schemeOmsList from '../oms.json';

const router = Router();

router.post('/reverse', (request, response) => {
    try {
        let reverse = [];
        const { string } = request.body;
        const stringList = string.split('') as string[];
        for (let i = stringList.length; i >= 0; i--) {
            let item = stringList[i];
            reverse.push(item);
        }
        return response.json({ reversedString: reverse.join('') })
    } catch (error) {
        throw new error;
    }
});

router.post('/max', (request, response) => {
    try {
        let result = 0;
        const data = request.body.array as number[];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (i > 0) {
                let previousItem = data[i - 1];
                if (item > previousItem) {
                    result = item;
                } else {
                    result = previousItem;
                }
            }
        }
        return response.json({ max: result })
    } catch (error) {
        throw new error;
    }
});

router.post('/redundant', (request, response) => {
    try {
        let result = 1;
        let number = request.body.n as number;
        for (let i = 1; i <= number; i++) {
            result *= i;
        }

        return response.json({ factorial: result })
    } catch (error) {
        throw new error;
    }
});

router.post('/prime', (request, response) => {
    try {
        let isPrime = true;
        const number = request.body.num as number;
        if (number > 2 && number % 2 == 0 || (number !== 5 && number % 5 == 0) || number > 3 && number % 3 == 0) isPrime = false;
        return response.json({ is_prime: isPrime })
    } catch (error) {
        throw new error;
    }
});

router.post('/bubble-sort', (request, response) => {
    try {
        const array = request.body.arr as number[];

        for (let i = 0; i < array.length; i++) {
            for (let j = i; j < array.length; j++) {
                if (array[i] > array[j]) {
                    let temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
        return response.json({ sorted_arr: array });
    } catch (error) {
        throw new error;
    }
});

router.post('/binary-search', (request, response) => {
    try {
        const functionHelper = new FunctionHelper();
        const array = request.body.array as number[];
        const target = request.body.target as number;
        let index_center = -1;
        let count = 0;
        return response.json({ index: functionHelper.sortArray(array, target, index_center, count) });
    } catch (error) {
        throw error;
    }
});

router.post('/palindrome', (request, response) => {
    const { string } = request.body;
    const stringList = string.split('');
    let result = true;
    for (let i = 0, j = stringList.length - 1; i < stringList.length, j > i; i++, j--) {
        if (stringList[i] !== stringList[j]) {
            result = false;
        }
    }
    response.json({ is_palindrome: result })
});

router.post('/fizzbuzz', (request, response) => {
    const { number } = request.body;
    let string = '';
    for (let i = 0; i <= number; i++) {
        if (i % 5 == 0 && i % 3 == 0) {
            string += 'fizzbuzz ';
            continue;
        }
        if (i % 3 == 0) {
            string += 'fizz ';
            continue;
        }
        if (i % 5 == 0) {
            string += 'buzz ';
            continue;
        }

        string += `${i} `;

    }
    response.json({ result: string })
});

router.post('/twoSum', (request, response) => {
    try {
        const array = request.body.array as number[];
        const target = request.body.target as number;
        let results = [];
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            if (array.includes(target - element)) {
                results.push(target - element);
                results.push(element);
                break;
            }
        }

        return response.json({ results })

    } catch (error) {
        throw error;
    }
});

router.post('/merge-sort', (request, response) => {
    try {
        const functionHelper = new FunctionHelper();
        const array = request.body.array as number[];
        let result = functionHelper.mergeSort(array)
        response.json({ sorted_array: result })
    } catch (error) {
        throw error;
    }
});

router.post('/get', (request, response) => {
    try {
        let result = [];
        const omsList = schemeOmsList.data.oms_product_scheme;
        const mplList = schemeMPLList.data.LOS_group_product_scheme;
        for (let oms_scheme of omsList) {
            for (let mpl_scheme of mplList) {
                if (oms_scheme.oms_product.code == mpl_scheme.LOS_product.code && oms_scheme.deleted !== mpl_scheme.deleted && oms_scheme.oms_scheme.productCode == mpl_scheme.LOS_product_scheme.productCode) {
                    result.push(oms_scheme);
                }
            }
        }
        response.json(result);
    } catch (error) {
        throw error;
    }
});

export default router;