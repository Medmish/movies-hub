//creating custom hook
const useGenres =(selectedGenres)=>{
    if(selectedGenres.length<1) return "";
    const GenreIds=selectedGenres.map((g)=> g.id);
    return GenreIds.reduce((acc,curr)=>acc+","+curr);
}
export default useGenres

// Parameters: The hook takes a single parameter named selectedGenres, which is an array containing selected genres.
// Condition Check: The hook checks if the length of the selectedGenres array is less than 1 (i.e., if there are no selected genres). If there are no selected genres, it returns an empty string "".
// Map and Reduce: If there are selected genres, the hook maps over the selectedGenres array to extract the id property of each genre object. This creates an array of genre IDs (GenreIds).
// Reduce Function: Then, it uses the reduce function on GenreIds to concatenate the IDs into a single string with each ID separated by a comma. This creates a comma-separated string of genre IDs.
// Return Value: Finally, the hook returns this comma-separated string of genre IDs. If there are no selected genres, it returns an empty string.