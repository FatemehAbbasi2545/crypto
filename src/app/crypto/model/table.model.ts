
export class TableOptions {
    pageSize: number = 10;
    displayedColumns: string[] = [];
    columns: Column[] = [];

    constructor(props?: Partial<TableOptions>) {
        Object.assign(this, props);
    }
}

export interface Column {
    colDef: string;
    headerCellDef?: string;
    inVisible?: boolean;
}
