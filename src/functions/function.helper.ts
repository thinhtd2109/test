import e from 'express';
import _ from 'lodash';

export class FunctionHelper {
    sortArray(array: number[], target: number, index_center: number, count) {
        count++
        for (let i = 0; i < array.length; i++) {
            if (array[i] == target) {
                index_center = i - 1;
            }
        }

        if (array[index_center] < target) {
            let arraySplit = array.slice(index_center + 1, array.length + 1);
            this.sortArray(arraySplit, target, index_center, count);
            if (arraySplit[0] == target) return arraySplit

        }
        if (array[index_center] > target) {
            let arraySplit = array.slice(0, index_center + 1);
            this.sortArray(arraySplit, target, index_center, count);
            if (arraySplit[0] == target) return count
        }
        return count
    }
    mergeSort(arr: number[]) {
        if (arr.length <= 1) {
            return arr;
        }
        let middleIndex = Math.floor(arr.length / 2);
        const left = arr.slice(0, middleIndex);
        const right = arr.slice(middleIndex);

        let result = [];

        let leftArray = this.mergeSort(left);
        let rightArray = this.mergeSort(right);

        let leftIndex = 0;
        let rightIndex = 0;

        for (let i = 0; i < arr.length; i++) {
            if (leftIndex >= leftArray.length) {
                result.push(rightArray[rightIndex]);
                rightIndex++;
            } else if (rightIndex >= rightArray.length) {
                result.push(leftArray[leftIndex]);
                leftIndex++;
            } else if (leftArray[leftIndex] < rightArray[rightIndex]) {
                result.push(leftArray[leftIndex]);
                leftIndex++;
            } else {
                result.push(rightArray[rightIndex]);
                rightIndex++;
            }
        }
        return result;
    }
    swap(elementOne, elementTwo) {
        let temp = elementOne;
        elementOne = elementTwo;
        elementTwo = temp;
    }
}