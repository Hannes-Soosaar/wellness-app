

const handleLogin = (req, res) => {
    console.log("We arrived at the login controller!");
    res.status(200).json({ message: 'Task completed' });
  };
  

export default handleLogin;