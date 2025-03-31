import bcrypt from "bcryptjs";



export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

export const compareHashPassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}