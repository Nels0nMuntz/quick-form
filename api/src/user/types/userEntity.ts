export interface UserEntity {
  id: string;
  email: string;
  full_name: string;
  password_hash: string;
  createdAt: Date;
  updatedAt: Date;
}
