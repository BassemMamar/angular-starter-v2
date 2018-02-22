import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: './block-ui-template.component.html',
    styleUrls: ['./block-ui-template.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BlockUITemplateComponent implements OnInit {
    message: string;
    constructor() { }

    ngOnInit() { }
}
