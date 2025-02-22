// filepath: /c:/Users/holly/learn-next/app/api/auth/[...nextauth]/route.ts
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import GitHubProvider from "next-auth/providers/github";
import { signIn, signOut } from "next-auth/react";
import NextAuth from "next-auth/next";

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth credentials");
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: (profile as any)?.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: (profile as any)?.id,
          name: user.name || undefined,
          username: (profile as any)?.login,
          email: user.email || undefined,
          image: user.image || undefined,
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: (profile as any).id,
          });

        token.githubId = (profile as any).id;
        token.username = (profile as any).login;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        githubId: token.githubId,
        username: token.username,
      };
    },
  },
  // Add any other NextAuth configuration here
});

export { handler as GET, handler as POST, signIn, signOut };
