import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const routeSlide = trigger('routeSlide',[
    transition("*<=>*", [
        query(':enter, :leave',[
            style({
                position: 'absolute',
                // top: 0,
                // left: 0,
                opacity:0,
                width: '100%',
            })
        ],{optional: true}),

        query(':enter', [
            style({ 
                // left: '-5%',
             opacity: .5 })
        ], {optional: true}),

        group([
            query(':leave', [
              animate('700ms cubic-bezier(.44,-0.02,.87,.95)', style({ 
                // left: '1%', 
                opacity: 0 }))
            ], {optional: true}),
            
            query(':enter', [
              animate('700ms cubic-bezier(.44,-0.02,.87,.95)', style({ 
                left: '0%', 
                opacity: 1 }))
            ], {optional: true})
        ]),
    ])
]);


export const slide = trigger('slide',[
    transition(':enter',[
        style({ opacity: 0 }),
        animate('.3s cubic-bezier(.48,.46,.5,.65)', style({ opacity: 1 }))
    ]),

    transition(':leave',[
        // style({ opacity: 0, transform: 'translateX(-10%)' }),
        animate('.3s cubic-bezier(.48,.46,.5,.65)', style({ opacity: 0}))
    ])

])