
function Login() {
  return (
    <div className="login-box">
      <h2 className="heading-login-box">Login</h2>
      <form>
        <div className="user-box">
          <input className="user-box-input" name='email' autoComplete="off" type="text" required />
          <label className="user-box-label">Email</label>
        </div>
        <div className="user-box">
          <input className="user-box-input" name="password" type="password" required />
          <label className="user-box-label">Password</label>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a className="login-box-button" href="#">
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
      </form>
    </div>
  )
}

export default Login
