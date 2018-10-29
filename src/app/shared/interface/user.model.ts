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
    Roles: Role[];
    Branches: Branch[];
}

export interface Role {
    id: number;
    name: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    UserRoles: UserRole;
}

export interface UserRole {
    RoleId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Branch {
    id: number;
    name: string;
    city: string;
    createdAt: string;
    updatedAt: string;
    UserBranches: UserBranch;
}

export interface UserBranch {
    BranchId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
}
