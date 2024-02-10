import { lazy } from 'react';

export function lazyLoad (path: string, namedExport: any) {
    return lazy((): any => {
        const promise = import(path);
        if (namedExport === null) {
            return promise;
        } else {
            promise.then((module): any => ({default: module[namedExport]}))
        }
    })
};