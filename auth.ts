import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers'

declare module 'next-auth' {
  interface Session {
    // @ts-ignore
    user: {
      /** The user's id. */
      id: string
    }
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental
  // @ts-ignore
} = NextAuth({
  providers: [GitHub],
  callbacks: {
    // @ts-ignore
    jwt: async ({ token, profile }) => {
      if (profile) {
        token.id = profile.id
        token.image = profile.picture
      }
      return token
    },
    // @ts-ignore
    authorized({ auth }) {
      return !!auth?.user
    },
    trustHost: true
  },
  pages: {
    signIn: '/sign-in'
  }
})
