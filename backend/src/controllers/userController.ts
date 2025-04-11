const handleUser = (req, res) => {
    console.log("We arrived at the user controller!");
    res.status(200).json({ message: 'Task completed' });
  };
  

export default handleUser;