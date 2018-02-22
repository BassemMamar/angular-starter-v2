import { Injectable } from '@angular/core';

import { Predicate, EnumType } from './interfaces';

import * as _ from 'lodash';

@Injectable()
export class CommonService {

    constructor() { }

    /*
    Removes an item from an array using the lodash library
    */
    removeItemFromArray<T>(array: Array<T>, item: any) {
        _.remove(array, function (current) {
            // console.log(current);
            return JSON.stringify(current) === JSON.stringify(item);
        });
    }

    removeItems<T>(array: Array<T>, predicate: Predicate<T>) {
        _.remove(array, predicate);
    }

    /*
    Finds a specific item in an array using a predicate and repsaces it
    */
    setItem<T>(array: Array<T>, predicate: Predicate<T>, item: T) {
        const _oldItem = _.find(array, predicate);
        if (_oldItem) {
            const index = _.indexOf(array, _oldItem);
            array.splice(index, 1, item);
        } else {
            array.push(item);
        }
    }

    /*
    Adds an item to zero index
    */
    addItemToStart<T>(array: Array<T>, item: any) {
        array.splice(0, 0, item);
    }

    /*
    From an array of type T, select all values of type R for property
    */
    getPropertyValues<T, R>(array: Array<T>, property: string): R {
        const result = _.map(array, property);
        return <R><any>result;
    }

    /*
    Util method to serialize a string to a specific Type
    */
    getSerialized<T>(arg: any): T {
        return <T>JSON.parse(JSON.stringify(arg));
    }

    /**
     * Finding matching objects in an array of objects
     * @param array: array of object
     * @param properties: object to match with
     */
    findByMatchingProperties<T>(array: Array<T>, properties: T) {
        return array.filter(function (entry) {
            return Object.keys(properties).every(function (key) {
                return entry[key] === properties[key];
            });
        });
    }

    /**
     * Convert typescipt enum to an array of string
     * @param Enum typescipt enum object
     * @param enumType enum type which could be either Numeric enum (default), or String enum
     * @returns return an array od sreting Keys from the enum
     */
    convertEnumToArray(Enum: object, enumType: EnumType = EnumType.Numeric): string[] {
        const options: string[] = Object.keys(Enum);
        switch (enumType) {
            case EnumType.Numeric:
                /**
                 * The options list has the numeric keys, followed by the string keys
                 * So, the first half is numeric, the 2nd half is strings
                 */
                return options.slice(options.length / 2);
            case EnumType.String:
                /**
                 * In case of String Enum
                 * the key and it's value is the same string, so no need slice, just return the result
                 */
                return options;
        }

    }
}
