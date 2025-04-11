const handleProfile = (req, res) => {
    console.log("We arrived at the profile controller!");
    res.status(200).json({ message: 'Task completed' });
  };
  

export default handleProfile;