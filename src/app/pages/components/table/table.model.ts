export interface Column {
    name: string;
    title: string;
    order?: string;
    selected?: boolean 
};

// export interface Columns{
//     columns: Column[];
// };

export interface TableSettings {
    filter: boolean; 
    sortable: boolean;
    maxPage: number;
}