import bcrypt from "bcryptjs";

//password hash  function
export const HashPassword = async (plainPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainPassword, salt);
    } catch (error) {
        throw new Error("Password hashing failed");
    }
};
//password match password

export const ComparePassword = async (plainPassword, HashPassword) => {
    try {
        return await bcrypt.compare(plainPassword, HashPassword);
    } catch (error) {
        return false;
    }
};