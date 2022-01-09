import Prismic from "@prismicio/client";
import Link from "next/link";
import { apiEndpoint, accessToken } from "../prismicConfiguration";

// -- @prismicio/client initialisation
// Initialises the Prismic Client that's used for querying the API and passes it any query options.
export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

// Options to be passed to the Client
const createClientOptions = (
  req = null,
  prismicAccessToken = null,
  routes = null
) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  // const routesOption = routes ? { routes: Router.routes } : {}
  return {
    ...reqOption,
    ...accessTokenOption,
    //   ...routesOption,
  };
};

export default Client;
