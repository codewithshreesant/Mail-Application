import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js'; 
import bcrypt from 'bcryptjs'; 

const JWT_SECRET = 'your_jwt_secret'; 

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const admin = await Admin.findOne({ email });
        console.log("admin ", admin);
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await admin.comparePassword(password);
        console.log("isMatch ", isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: admin._id, isAdmin: admin.isAdmin },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful!', token, status:200 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const createAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin with this email already exists.' });
        }

        const newAdmin = new Admin({
            email,
            password
        });

        await newAdmin.save();

        res.status(201).json({
            message: 'Admin created successfully!',
            admin: { id: newAdmin._id, email: newAdmin.email },
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
