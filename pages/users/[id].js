import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

import Container from "../../components/Container";

const User = ({ user }) => {
  const router = useRouter();
  const {id}  = router.query;

  return (
    <Container>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center">
              <img
                src={user.avatar}
                alt={user.first_name + " " + user.last_name}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="card-body text-center">
              <h3>
                {user.id}. {user.first_name} {user.last_name}
              </h3>
              <p>Email: {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://reqres.in/api/users')
  const resJson = await res.json()
  const users = resJson.data

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://reqres.in/api/users/${params.id}`)
  const resJson = await res.json()
  const user = resJson.data

  return { props: { user } }
}


export default User;