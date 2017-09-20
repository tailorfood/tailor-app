import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

const network = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj2ngyezgt0o80175f5vtlmcz' }).use([{
    applyMiddleware(req, next) {
        AsyncStorage.getItem('token').then(token => {
            const auth = token ? `Bearer ${token}` : null
            req.options.headers = req.options.headers || {}
            req.options.headers.authorization = authorization
            next()
        })
    }
}])

const subscriptions = new SubscriptionClient(
    'wss://subscriptions.graph.cool/v1/cj2ngyezgt0o80175f5vtlmcz',
    { reconnect: true }
)

const networkSubscribed = addGraphQLSubscriptions(network, subscriptions)

const client = new ApolloClient({
    connectToDevTools: !!__DEV__,
    dataIdFromObject: ({ id }) => id,
    networkInterface: networkSubscribed
})

export const query = (queryGql, variables, fetchPolicy, notifyOnNetworkStatusChange) => {
    try {
        return client.query({
            query: queryGql,
            variables,
            fetchPolicy,
            notifyOnNetworkStatusChange
        })
    } catch (err) {
        console.warn(err)
        return new Promise((resolve, reject) => { reject(err) })
    }
}

export const mutation = (mutationGql, variables ) => {
    try {
        return client.mutate({
            mutation: mutationGql,
            variables,
        })
    } catch (err) {
        console.warn(err)
        return new Promise((resolve: Function, reject: Function) => { reject(err) })
    }
}

export default client