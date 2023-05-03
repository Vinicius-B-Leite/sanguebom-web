import { api } from ".";
import { UserType } from "../types/UserType";

export async function login(email: string, password: string) {
    return (await api.post<UserType>('/auth/login', {email, password, isAdmin: true})).data
}