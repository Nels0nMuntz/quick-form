export interface TokenEntity {
    id: string;
    refresh_token: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}