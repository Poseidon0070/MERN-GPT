import { Form, Link } from "react-router-dom"
import type { ActionFunction } from "react-router";
import Animation from "../components/Animation";
import axios, { AxiosResponse } from "axios";
import { useActionData } from "react-router-dom";
import { useAppDispatch } from "../store/exporter";
import { userActions } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

function Signup() {
  let actionResponse: any = useActionData()
  let navigate = useNavigate()
  let dispatch = useAppDispatch()
  useEffect(() => {
    if (actionResponse && actionResponse.status === 201) {
      let userData = actionResponse.data.user
      dispatch(userActions.login({ name: userData.name, email: userData.email }))
      toast.success("Signup Successful.")
      navigate('/')
    }
    else if((actionResponse && actionResponse.data.msg) || (actionResponse && actionResponse.data.error)){
      toast.error('Invalid credentials! Please retry.')
    }
  }, [actionResponse, dispatch, navigate])

  return (
    <div className="container">
      <div>
        <Animation />
      </div>
      <div className="login-box">
        <h2 className="heading-login-box">Signup</h2>
        <Form method="POST">
          <div className="user-box">
            <input className="user-box-input" name='name' autoComplete="off" type="text" required />
            <label className="user-box-label">Name</label>
          </div>
          <div className="user-box">
            <input className="user-box-input" name='email' autoComplete="off" type="text" required />
            <label className="user-box-label">Email</label>
          </div>
          <div className="user-box">
            <input className="user-box-input" name="password" type="password" required />
            <label className="user-box-label">Password</label>
          </div>
          {actionResponse && actionResponse.data.msg && <p style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{actionResponse.data.msg}</p>}
          {actionResponse && actionResponse.data.error && actionResponse.data.error.map((err: any) => <p key={err.msg} style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{err.msg}</p>)}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a className="login-box-button">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <input type="submit" style={{
                border: 'none',
                background: 'none',
                color: 'inherit',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none',
                width: "100px",
                height: "30px",
                margin: "0px"
              }} value="Signup" />
            </a>
          </div>
        </Form>
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <p>Already have an account ?</p>
          <Link to='../login' className='no-dec' style={{ background: 'none' }}>Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup

let SignupAction: ActionFunction = async ({ request }) => {
  let userData = await request.formData()
  let user = {
    name: userData.get('name'),
    email: userData.get('email'),
    password: userData.get('password')
  }
  console.log(user)

  try {
    let response: AxiosResponse = await axios.post('http://localhost:8080/user/signup', user, { withCredentials: true })
    return response

  } catch (err: any) {
    return err.response
  }
};


export { SignupAction }
