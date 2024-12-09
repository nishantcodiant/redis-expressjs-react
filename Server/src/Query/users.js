const { supabase } = require('../Services/supabase')
const getAllUser = async () => {
    const { data, error } = await supabase
        .from('users') // Replace with your table name
        .select('*');            // Select all columns

    if (error) {
        return false
    } else {
        return data
    }
}
/**
 * @param {object} userData 
 * @returns 
 */
const addUser = async (userData) => {
    const { data, error } = await supabase
        .from('users') // Replace with your table name
        .insert(userData);
    if (error) {
        return false
    } else {
        return data
    }
}

module.exports = { getAllUser, addUser };