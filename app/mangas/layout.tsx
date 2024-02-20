import { SignOutButtons, SignInButtons } from "@/components/nextAuthButtons";
import { Button } from "@/components/ui/button";
import { sessionProvider } from "@/lib/utilsSession";
import { Link } from "lucide-react";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return sessionProvider((session) => {
    return (
      <>
        <header>
          <nav className="flex flex-row justify-around">
            {session ? (
              <>
                <SignOutButtons />
                <Link href="/mangas">
                  <Button variant="secondary">Mangas</Button>
                </Link>
              </>
            ) : (
              <>
                <SignInButtons />
                <Link href="/">
                  <Button variant="secondary">Home</Button>
                </Link>
              </>
            )}
          </nav>
        </header>
        {children}
      </>
    );
  });
};

export default layout;
