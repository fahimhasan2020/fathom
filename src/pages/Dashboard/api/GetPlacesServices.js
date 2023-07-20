
const autocompleteLocation = async ( query ) => {
    // const GOOGLE_APIKEY = 'AIzaSyCaLP0xTGm9qspafTff1n31oGIO3QzYJkY';
    const GOOGLE_APIKEY = 'AIzaSyBJlwnaNMA01U2K7bUthv4BTs3lygMSyRg';
    let URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=' + GOOGLE_APIKEY +
    '&input=' + query + '&radius=1000';
    const resp = await fetch(URL);
    return resp.json();
};
    export default autocompleteLocation;
