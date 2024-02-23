import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const sessionProvider = async (fn: (sessionValue: Session) => any, elseFn?: () => any) => {
    const session = await getServerSession(authOptions);
    if(session) {
        return fn(session);
    }else return elseFn ? elseFn() : redirect('/');
}