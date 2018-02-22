import { DefaultUrlSerializer, UrlTree, UrlSerializer } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        // https://angular.io/api/router/UrlSerializer ToDo check it later
        // https://github.com/chsakell/angular2-features/blob/master/src/app/shared/utils/lower-case-url-serializer.ts

        return super.parse(url.toLowerCase());
        //   return super.parse(url);
    }
}

export const LowerCaseUrlSerializerProvider = {
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer
};
