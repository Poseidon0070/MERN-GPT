import { Form } from "react-router-dom"
import type { ActionFunction } from "react-router";
function Signup() {
  return (
    <div className="login-box">
      <h2 className="heading-login-box">Signup</h2>
      <Form method="POST">
        <div className="user-box">
          <input className="user-box-input" name='email' autoComplete="off" type="text" required />
          <label className="user-box-label">Email</label>
        </div>
        <div className="user-box">
          <input className="user-box-input" name="password" type="password" required />
          <label className="user-box-label">Password</label>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a className="login-box-button" style={{padding:"2px"}}>
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
              width:"100px",
              height:"30px",
              margin:"0px"
            }} value="Signup" />
          </a>
        </div>
      </Form>
    </div>
  )
}

export default Signup

let SignupAction: ActionFunction = async ({ request, params }) => {
  console.log("here")
  let userData = await request.formData()
  let user = {
    email: userData.get('email'),
    password: userData.get('password')
  }
  console.log(user)
}

export { SignupAction }
