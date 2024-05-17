
interface HeaderDetails {
    title: string
    description?: string
}

type Header = {
    [key: string]: HeaderDetails;
};

const headers: Header = {
    dashboard: {
        title: "Dashboard",

    }
}