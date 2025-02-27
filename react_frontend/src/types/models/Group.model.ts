
export interface Group {
    id: string;
    groupName: string;
    motto: string;
    logo: string;
    members: { id: string; username: string; email: string }[];
}