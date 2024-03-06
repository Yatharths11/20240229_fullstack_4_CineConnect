//validate movie Data

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

    // Validate specific fields
    if (typeof name !== 'string' || name.trim() === '' || /[#$!]/.test(name) ) {
        return { valid: false, error: "Name must be a non-empty string." };
    }

    if (typeof theatre_id !== 'string' || theatre_id.trim() === '') {
        return { valid: false, error: "Theatre ID must be a non-empty string." };
    }

    if (typeof description !== 'string' || description.trim() === '') {
        return { valid: false, error: "Description must be a non-empty string." };
    }

    if (typeof screen !== 'string' || screen.trim() === '') {
        return { valid: false, error: "Screen must be a non-empty string." };
    }

    if (typeof language !== 'string' || language.trim() === '') {
        return { valid: false, error: "Language must be a non-empty string." };
    }

    if (!Array.isArray(genre) || genre.length === 0 || !genre.every(g => typeof g === 'string' && g.trim() !== '')) {
        return { valid: false, error: "Genre must be a non-empty array of strings." };
    }

    if (typeof price !== 'number' || price <= 0) {
        return { valid: false, error: "Price must be a positive number." };
    }

    if (typeof ratings !== 'number' || ratings < 0 || ratings > 10) {
        return { valid: false, error: "Ratings must be a number between 0 and 10." };
    }

    const myDate = new Date(date);

    const isDateValid = !isNaN(myDate);
    if (!isDateValid) {
        return { valid: false, error: "Date must be a valid date." };
    }

    if (typeof availableSeats !== 'number' || availableSeats < 0 || availableSeats > 1200) {
        return { valid: false, error: "Available seats must be a non-negative number and cannot exceed 1200." };
    }

    if (typeof pgRating !== 'string' || pgRating.trim() === '') {
        return { valid: false, error: "PG Rating must be a non-empty string." };
    }

    // Convert the date to the desired format "YYYY-MM-DD"
    const formattedDate = myDate.toISOString().split('T')[0];
    console.log("date:" + formattedDate);

    // If all validations pass, return valid as true
    return { valid: true, date: formattedDate };
}

module.exports = { validateMovieData };
