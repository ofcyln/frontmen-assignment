export interface LoginResponse {
    token: string;
    user: User;
}

export interface User {
    id: number;
    guid: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    Roles: Roles[];
    Branches: Branches[];
}

export interface Roles {
    id: number;
    name: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    UserRoles: UserRoles;
}

export interface UserRoles {
    RoleId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Branches {
    id: number;
    name: string;
    city: string;
    createdAt: string;
    updatedAt: string;
    UserBranches: UserBranches;
}

export interface UserBranches {
    BranchId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
}
