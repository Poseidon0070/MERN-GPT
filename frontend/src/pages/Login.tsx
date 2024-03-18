import { ActionFunction, Form, Link, useActionData, useNavigate } from "react-router-dom"
import Animation from "../components/Animation"
import axios, { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "../store/exporter";
import { useEffect } from "react";
import { userActions } from "../store/store";
import { toast } from "sonner";

function Login() {
  let actionResponse: any = useActionData()
  let dispatch = useAppDispatch()
  let isLoggedIn = useAppSelector(state => state.isLoggedIn);
  let navigate = useNavigate()

  useEffect(() => {
    if(isLoggedIn) {
      console.log("here")
      toast.info('You are already logged in')
      navigate('/chat')
      return ;
    }
    if (actionResponse && actionResponse.status === 201) {
      let userData = actionResponse.data.user
      dispatch(userActions.login({ name: userData.name, email: userData.email, chats: userData.chats }))
      toast.success("Login Successful")
      navigate('/')
    }
    else if((actionResponse && actionResponse.data.msg) || (actionResponse && actionResponse.data.error)){
      toast.error('Invalid credentials! Please retry.')
    }
  }, [isLoggedIn,actionResponse, dispatch, navigate])
  return (
    <div className="container">
      <div>
        <Animation />
      </div>
      <div className="login-box">
        <h2 className="heading-login-box">Login</h2>
        <Form method="POST"> 
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
              }} value="Login" />
            </a>
          </div>
        </Form>
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <p>Account not created yet ?</p>
          <Link to='../signup' className='no-dec' style={{ background: 'none' }}>Signup here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login

let loginAction: ActionFunction = async ({ request }) => {
  let userData = await request.formData()
  let user = {
    name: userData.get('name'),
    email: userData.get('email'),
    password: userData.get('password')
  }

  try {
    let response: AxiosResponse = await axios.post('http://localhost:8080/user/login', user, { withCredentials: true })
    return response
  } catch (err: any) {
    return err.response
  }
};

export { loginAction }

// import { Form, Link, redirect } from "react-router-dom"
// import type { ActionFunction } from "react-router";
// import Animation from "../components/Animation";
// import axios, { AxiosResponse } from "axios";
// import { useActionData } from "react-router-dom";
// import { useAppDispatch } from "../store/exporter";
// import { userActions } from "../store/store";

// const Signup = () => {
//   let actionResponse: any = useActionData()
//   let dispatch = useAppDispatch()
//   if (actionResponse && actionResponse.status === 201) {
//     let userData = actionResponse.data
//     dispatch(userActions.login({ name: userData.name, email: userData.email }))
//     return redirect('/')
//   }
//   return (
//     <div className="container">
//       <div>
//         <Animation />
//       </div>
//       <div className="login-box">
//         <h2 className="heading-login-box">Signup</h2>
//         <Form method="POST">
//           <div className="user-box">
//             <input className="user-box-input" name='name' autoComplete="off" type="text" required />
//             <label className="user-box-label">Name</label>
//           </div>
//           <div className="user-box">
//             <input className="user-box-input" name='email' autoComplete="off" type="text" required />
//             <label className="user-box-label">Email</label>
//           </div>
//           <div className="user-box">
//             <input className="user-box-input" name="password" type="password" required />
//             <label className="user-box-label">Password</label>
//           </div>
//           {actionResponse && actionResponse.data.message && <p style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{actionResponse.data.message}</p>}
//           {actionResponse && actionResponse.data.error && actionResponse.data.error.map((err: any) => <p key={err} style={{ fontSize: "12px", color: "red", textAlign: "center" }}>{err.msg}</p>)}
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <a className="login-box-button">
//               <span></span>
//               <span></span>
//               <span></span>
//               <span></span>
//               <input type="submit" style={{
//                 border: 'none',
//                 background: 'none',
//                 color: 'inherit',
//                 padding: 0,
//                 font: 'inherit',
//                 cursor: 'pointer',
//                 textDecoration: 'none',
//                 width: "100px",
//                 height: "30px",
//                 margin: "0px"
//               }} value="Signup" />
//             </a>
//           </div>
//         </Form>
//         <div style={{ marginTop: "25px", textAlign: "center" }}>
//           <p>Already have an account ?</p>
//           <Link to='../login' className='no-dec' style={{ background: 'none' }}>Login here</Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup

// let SignupAction: ActionFunction = async ({ request }) => {
//   let userData = await request.formData()
//   let user = {
//     name: userData.get('name'),
//     email: userData.get('email'),
//     password: userData.get('password')
//   }
//   console.log(user)

//   try {
//     let response: AxiosResponse = await axios.post('http://localhost:8080/user/signup', user, { withCredentials: true })
//     return response

//   } catch (err: any) {
//     console.log(err)
//     return err.response
//   }
// };
// // let SignupAction: ActionFunction = async ({ request }) => {
// //   let userData = await request.formData()
// //   let user = {
// //     name: userData.get('name'),
// //     email: userData.get('email'),
// //     password: userData.get('password')
// //   }
// //   console.log(user)

// //   try {
// //     let response : AxiosResponse = await axios.post('http://localhost:8080/user/signup', user, { withCredentials: true })
// //     if (response.status === 201) {
// //       let data = response.data
// //       let dispatch = useAppDispatch()
// //       dispatch(userActions.login({name: data.name, email: data.email}))
// //       console.log(data)
// //       return redirect('/')
// //     } else {
// //       return response
// //     }

// //   } catch (err: any) {
// //     console.log(err)
// //     return err.response
// //   }
// // };

// export { SignupAction }
