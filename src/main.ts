import { graphql } from 'gql.tada'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const client = new ApolloClient({
    uri: 'https://graphqlzero.almansi.me/api',
    cache: new InMemoryCache(),
})

const userFragment = graphql(/* GraphQL */`
    fragment userFields on User {
        username
        email
    }
`)

const usersQuery = graphql(/* GraphQL */`
    query users {
        users {
            data {
                ...userFields
            }
        }
    }
`, [userFragment])

client.query({ query: usersQuery }).then(result => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<pre>${JSON.stringify(result.data, null, 2)}</pre>`
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = 'Hello!'
