const handleTest = (req, res) => {
    console.log("We arrived at the test controller!");
    res.status(200).json({ message: 'Task completed' });
  };
  

export default handleTest;