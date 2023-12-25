import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/mangas");
  }

  return (
    <main className="flex flex-col justify-center items-center text-center">
      <h1 className="bg-green-400 rounded w-2/4 m-3 p-1">Manweb</h1>
      <h2 className="bg-blue-400 rounded w-2/4 m-3 p-1">
        Bienvenue sur le site qui se souvient de toutes tes lectures
      </h2>
      <h3 className="bg-red-400 rounded w-2/4 m-3 p-1">
        tu n&aposes actuellement pas connecte
      </h3>

      <p>
        actuellement en devellopement je te conseil de tester l&aposapplication en
        te connectant via google
      </p>
    </main>
  );
}
