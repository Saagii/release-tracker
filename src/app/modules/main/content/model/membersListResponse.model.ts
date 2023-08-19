export interface MembersListResponse {
    _id: string,
    memberType: string,
    firstName: string,
    lastName: string,
    email: string,
    title: string,
    isActive: boolean,
    password: string
}[];