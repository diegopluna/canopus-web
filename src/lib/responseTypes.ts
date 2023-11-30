export interface AddressType {
    cep: string;	
    state: string;
    municipality: string;
    district: string;
    street: string;
    streetNumber: number;
    complement: string | null;
}

export interface UserType {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    verified: boolean;
    role: string;
    interests: string[];
    address: AddressType;
    avatar: string | null;
}

export interface SchoolType {
    id: number;
    name: string;
    address: AddressType;
    type: string;
    reps: UserType[];
}

export interface ProjectType {
    id: number;
    description: string;
    goals: string[];
    school: SchoolType;
    stakeholders: UserType[];
    startDate: string;
    endDate: string;
    updatedAt: string;
}