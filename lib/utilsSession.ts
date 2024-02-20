import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";

export const sessionProvider = async (fn: (sessionValue: Session) => any) => {
    const session = await getServerSession(authOptions);
    if(session) {
        return fn(session);
    }else throw new Error("No session found");
}