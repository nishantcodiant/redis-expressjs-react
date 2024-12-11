const { supabase } = require('../Services/supabase')
const getAllUser = async (columns) => {
    const { data, error } = await supabase
        .from('users') // Replace with your table name
        .select(columns.join(','));  // Select all columns

    if (error) {
        throw new Error(error.message); // Throw an error to propagate it
    }
    console.log(`[SUPABASE HIT] Data of the users table served from Supabase.`);
    return data;
};
/**
 * @param {object} userData 
 * @returns 
 */
const addUser = async (userData) => {
    const { data, error } = await supabase
        .from('users') // Replace with your table name
        .insert(userData);
    if (error) {
        throw new Error(error.message); // Throw an error to propagate it
    }
    return data;
}


const updateNotification = async (seen) => {
    const { data, error } = await supabase
        .from('notifications') // Replace with your table name
        .update({
            // is_active: 'true', seen: true
            seen: seen
        }) // Update the notification field to false
        .eq('id', 1);
    if (error) {
        throw new Error(error.message); // Throw an error to propagate it
    }
    console.log('update', data)
}

module.exports = { getAllUser, addUser, updateNotification };