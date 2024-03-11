import { useAppSelector } from "../store/exporter"

function Home() {
  let user = useAppSelector(state => state.user)
  console.log(user)
  return (
    <>
      {user && <h1 style={{textAlign:"center", marginTop:"20px"}}>Hi {user.name}</h1>}
    </>
  )
}

export default Home