import { Request, Response } from 'express';
import pool from '../../server'
import  hashPassword from '../utils/crypto'




const handleRegister = (req, res) => {
    console.log("We arrived at the register controller!");
    res.status(200).json({ message: 'Task completed' });
  };
  

export default handleRegister;