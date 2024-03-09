import { Form, Link, redirect } from "react-router-dom"
import type { ActionFunction } from "react-router";
import Animation from "../components/Animation";
import axios, { Axios } from "axios";
import { useActionData } from "react-router-dom";

function Signup() {
  let actionData = useActionData()
  console.log(actionData)
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
              {actionData && actionData.data.message && <p style={{fontSize:"12px", color:"red", textAlign:"center"}}>{actionData.data.message}</p>}
              {actionData && actionData.data.error && actionData.data.error.map((err) => <p style={{fontSize:"12px", color:"red", textAlign:"center"}}>{err.msg}</p>)}
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
  console.log("here")
  let userData = await request.formData()
  let user = {
    name : userData.get('name'),
    email: userData.get('email'),
    password: userData.get('password')
  }
  console.log(user)
  
  console.log('1................')
  try{
    let response = await axios.post('http://localhost:8080/user/signup', user, {withCredentials:true})
    console.log('2................')
    if(response.status === 200) {
      let data = response.data 
      console.log(data)
      return redirect('..')
    }else{
      console.log('3................')
      return response
    }

  }catch(err){
    console.log(err)
    // console.log('................')
    return err.response
  }
};
//

export { SignupAction }
