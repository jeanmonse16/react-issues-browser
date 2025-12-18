export interface IItemsSearchProps {
    value: string;
    setValue: (value: string) => void;
    onSearch: () => void;
    clearSearch: () => void;
    searchIsActive: boolean;
}