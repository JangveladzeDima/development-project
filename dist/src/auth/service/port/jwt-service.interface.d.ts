export interface IJwtService {
    login(payload: {
        id: number;
        role: string;
    }): Promise<{
        access_token: string;
    }>;
}
