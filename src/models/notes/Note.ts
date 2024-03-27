export default interface Note {
    id: number | null;
    dateTime: string;
    tags: Array<string>;
    categories: Array<string>;
    title: string;
    content: string;
    desciption: string
}