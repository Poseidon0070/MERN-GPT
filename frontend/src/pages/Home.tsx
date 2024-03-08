import { useAppDispatch, useAppSelector } from "../store/exporter"

function Home() {
  let isLoggedIn: boolean = useAppSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <div>
    </div>
  )
}

export default Home