import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import Header from './Header';
// import Footer from './Footer';


// Apollo client setup
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  console.log("authlink")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  
  return (
    <GoogleOAuthProvider clientId='77166529193-0ia7megl5lvnsjh3763rj74vps39a321.apps.googleusercontent.com'>
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>
    </GoogleOAuthProvider> 
  );
};

export default App;