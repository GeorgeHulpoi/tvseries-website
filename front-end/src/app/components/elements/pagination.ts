import { Component, Input, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, EventEmitter, Output, Renderer2 } from "@angular/core";

@Component({
    selector: "pagination",
    templateUrl: "../../templates/elements/pagination.html",
    styleUrls: 
    [
        "../../styles/elements/pagination.scss"
    ]
})
export class PaginationComponent implements AfterViewInit
{
    private readonly range: number = 7;
    private _current: number = 1;
    private _last: number;
    private _disabled: boolean = false;
    private viewInit: boolean = false;
    @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(private Ref: ElementRef, private Renderer: Renderer2, private CD: ChangeDetectorRef) {}

    ngAfterViewInit(): void 
    {
        this.CD.detach();
        this.viewInit = true;
    }

    public get current(): number 
    {
        return this._current;
    }

    
    public get last(): number 
    {
        return this._last;
    }

    @Input()
    public set current(value: number)
    {
        this._current = value;

        if (this.viewInit)
        {
            this.CD.detectChanges();
        }
    }

    @Input()
    public set last(value: number)
    {
        this._last = value;

        if (this.viewInit)
        {
            this.CD.detectChanges();
        }
    }

    public get disabled(): boolean 
    {
        return this._disabled;
    }

    @Input('ng-disabled')
    public set disabled(value: boolean)
    {
        this._disabled = value;

        if (value)
        {
            this.Renderer.addClass(this.Ref.nativeElement, "disabled");
        }
        else 
        {
            this.Renderer.removeClass(this.Ref.nativeElement, "disabled");
        }
    }

    public dec(): void 
    {
        if (this.current > 1)
        {
            this.current--;
            this.onPageChange.emit(this.current);
        }
    }

    public inc(): void 
    {
        if (this.current < this.last)
        {
            this.current++;
            this.onPageChange.emit(this.current);
        }
    } 

    public get pageArray(): number[]
    {
        let pages: number[] = [];

        const halfWay = Math.ceil(this.range / 2);

        const isStart = this.current <= halfWay;
        const isEnd = this.last - halfWay < this.current;
        const isMiddle = !isStart && !isEnd;

        let ellipsesNeeded = this.range < this.last;

        let i = 1;

        while (i <= this.range && i <= this.last)
        {
            let label;
            const pageNumber = this.calculatePageNumber(i, this.current, this.range, this.last);
            const openingEllipsesNeeded = (i === 2 && (isMiddle || isEnd));
            const closingEllipsesNeeded = (i === this.range - 1 && (isMiddle || isStart));
            
            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) 
            {
                label = -1;
            } 
            else 
            {
                label = pageNumber;
            }

            pages.push(label);

            i++;
        }

        return pages;
    }

    private calculatePageNumber(i: number, currentPage: number, paginationRange: number, totalPages: number) 
    {
        const halfWay = Math.ceil(paginationRange / 2);

        if (i === paginationRange) 
        {
            return totalPages;
        } 
        else if (i === 1) 
        {
            return i;
        } 
        else if (paginationRange < totalPages) 
        {
            if (totalPages - halfWay < currentPage) 
            {
                return totalPages - paginationRange + i;
            } 
            else if (halfWay < currentPage) 
            {
                return currentPage - halfWay + i;
            } 
            else 
            {
                return i;
            }
        } 
        else 
        {
            return i;
        }
    }

    public trackByFn(index, item) 
    {
        return index; 
    }

    public OnPageClicked(value: number, event?: any)
    {
        this.current = value;
        this.onPageChange.emit(value);
    }
}
