// Collection of global Dash funcs

export default {
    storePak: (input) => {
        // Convert JSON input to string
        let stringYakPak = JSON.stringify(input);

        // Save it to local storage
        window.localStorage.setItem('yakPak', stringYakPak);
    },
    retrievePak: () => {
        // Retrieve and return yakPak local store string and rehydrate it  (convert back to JSON)
        return JSON.parse(window.localStorage.getItem('yakPak'));
    }
}