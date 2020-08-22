import Container from "../components/Container";
import fetch from "isomorphic-unfetch";

import Head from "next/head";

import Users from "../components/Users";

const Index = ({users}) => (
  <Container>
    <Head>
      <title>Next - Home Page</title>
    </Head>
    <div>
      <h1>Next</h1>
      {/* {props.users[0].id} */}
      <Users users={users} />
    </div>
  </Container>
);

export async function getStaticProps() {
  const res = await fetch("https://reqres.in/api/users")
  const users = await res.json();

  return {
    props: {
      users: users.data
    },
  }
}


export default Index;