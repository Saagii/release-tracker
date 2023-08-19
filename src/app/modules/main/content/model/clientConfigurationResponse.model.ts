export interface ClientConfigurationResponse {
    types: {
        value: string;
        isActive: boolean;
        _id: string;
    }[];
    status: string[];
    _id: string;
};