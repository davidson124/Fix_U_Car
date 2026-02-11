import bcrypt from "bcryptjs";
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};       // Encrypt and compare passwords
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
// const password = 'Clave2026Secreta';
// bcrypt.hash(password, 10).then(hash =>{
//     console.log('El hash es:',hash);
// });