
import bcrypt from 'bcrypt';

const salt = 10;  // Number of salt rounds (higher is more secure)

export const hashPassword = async (password) => {
  try {
    
    
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};
 


