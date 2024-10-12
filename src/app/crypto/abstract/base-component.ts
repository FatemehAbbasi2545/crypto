import { Directive, Injector, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

@Directive({})
export abstract class BaseComponent implements OnDestroy {
    subscription = new Subscription();

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}