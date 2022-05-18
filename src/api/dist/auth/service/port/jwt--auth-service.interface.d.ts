export interface IJwtAuthService {
    login(payload: {
        email: string;
        role: string;
    }): Promise<{
        access_token: string;
    }>;
}
