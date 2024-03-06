// Validate movie Data
/**
 * @function validateMovieData
 * @param {Body} data 
 * @returns movie data 
 * 
 * To Validate all fields of Movie Data
 */

function validateMovieData(data) {
    const {
        name,
        theatre_id,
        description,
        screen,
        language,
        genre,
        price,
        ratings,
        date,
        availableSeats,
        pgRating
    } = data;

    // Check if all required fields are present
    if (!name || !theatre_id || !description || !screen || !language || !genre || !price || !ratings || !date || !availableSeats || !pgRating) {
        return { valid: false, error: "All fields are required." };
    }

    // Validate name
    if (typeof name !== 'string' || name.trim() === '' || /[^\w\s]/.test(name)) {
        return { valid: false, error: "Name must be a non-empty string without special characters." };
    }

    // Validate theatre ID
    if (typeof theatre_id !== 'string' || theatre_id.trim() === '') {
        return { valid: false, error: "Theatre ID must be a non-empty string." };
    }

    // Validate description
    if (typeof description !== 'string' || !/^[\w\s.,!?-]+$/.test(description)) {
        return { valid: false, error: "Description must be a string containing only alphanumeric characters, spaces, and the following punctuation marks: . , ! ? -" };
    }

    // Validate screen format and range
    if (typeof screen !== 'string' || !/^Screen\s\d+$/.test(screen) || parseInt(screen.split(" ")[1]) < 1 || parseInt(screen.split(" ")[1]) > 20) {
        return { valid: false, error: "Screen must be in the format 'Screen [Number]' and the screen number must be within the range of 1 to 20." };
    }

    // Validate language
    if (typeof language !== 'string' || language.trim() === '' || !/^[a-zA-Z\s]*$/.test(language)) {
        return { valid: false, error: "Language must be a non-empty string without numbers or special characters." };
    }

    // Validate genre
    if (!Array.isArray(genre) || genre.length === 0 || !genre.every(g => typeof g === 'string' && g.trim() !== '' && /^[a-zA-Z\s]{1,15}$/.test(g))) {
        return { valid: false, error: "Genre must be a non-empty array of strings with each string containing only letters and spaces, and having a maximum length of 15 characters." };
    }

    // Validate price
    if (typeof price !== 'number' || price <= 0) {
        return { valid: false, error: "Price must be a positive number." };
    }

    // Validate ratings
    if (typeof ratings !== 'number' || ratings < 0 || ratings > 10) {
        return { valid: false, error: "Ratings must be a number between 0 and 10." };
    }

    // Validate date
    const myDate = new Date(date);
    const isDateValid = !isNaN(myDate);
    if (!isDateValid) {
        return { valid: false, error: "Date must be a valid date." };
    }

    // Validate available seats
    if (typeof availableSeats !== 'number' || availableSeats < 0 || availableSeats > 1200) {
        return { valid: false, error: "Available seats must be a non-negative number and cannot exceed 1200." };
    }


    // Validate PG rating
    if (typeof pgRating !== 'string' || pgRating.trim() === '' || !["G", "PG", "PG-13", "R", "NC-17"].includes(pgRating)) {
        return { valid: false, error: "PG Rating must be a non-empty string and must be one of the following values: 'G', 'PG', 'PG-13', 'R', 'NC-17'." };
    }


    // Convert the date to the desired format "YYYY-MM-DD"
    const formattedDate = myDate.toISOString().split('T')[0];
    console.log("date:" + formattedDate);

    // If all validations pass, return valid as true
    return { valid: true, date: formattedDate };
}

module.exports = { validateMovieData };
