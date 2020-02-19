import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

    constructor(private productService: ProductService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>{
        const id = route.paramMap.get('id');

        if (isNaN(+id)) {
            const messge = `Product id is not a number ${id}`;
            console.error(messge);
            of({ product: null, error: messge });
        }
        return this.productService.getProduct(+id)
            .pipe(
                map(product => ({product: product})),
                catchError(error => {
                    const message = `Retrieval error ${error}`;
                    console.error(message);
                    return of({ product: null, error: message });
                })
            );
    }

}