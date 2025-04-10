

const handleRegister = (req, res) => {
    console.log("We arrived at the register controller!");
    res.status(200).json({ message: 'Task completed' });
  };
  

export default handleRegister;