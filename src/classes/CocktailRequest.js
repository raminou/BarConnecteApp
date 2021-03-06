import { Alert } from 'react-native';
import { API_URL, WS_URL } from 'react-native-dotenv';

/*
 * CocktailRequest object
 */
export default class CocktailRequest {
    constructor(drink, callback=null) {
        this.drink = drink; // Object {ingredients: [{name, value}]
        this.drink_id = "";
        this.ws = null;
        this.last_status = "unreceived";
        this.error = null;
        this.errorTimeout = null;
        this.close = false;
        this.date = Date.now();
        this.callback = callback;

        console.log("Cocktail request")
        this.requestHTTP();
    }

    /*
     * function requestHTTP
     * Make a HTTP Put Request to add a drink to the queue, and call requestWS if the request succeed
     */
    requestHTTP() {
        const url = API_URL + "/drink";

        console.log("Cocktail request HTTP")
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.drink)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log("HTTP REQUEST RESPONSE")
            Alert.alert("Success !", "Your order is registered");
            this.drink_id = res.data.id;
            this.requestWS();
        })
        .catch((error) => {
            console.log(`Error url: ${url}`);
            Alert.alert(`Error requesting ${url}`, error.toString(), [
                {text: 'Ok', style: 'cancel'}
            ]);

            if(this.callback !== null)
                this.callback(false);
        });
    }

    /*
     * function requestWS
     * Request to WS Server sending the drink_id to be link with the drink
     */
    requestWS() {
        console.log(`Try websockets: ${WS_URL}`);
        this.ws = new WebSocket(WS_URL);
        this.ws.onopen = () => {
            console.log("Open WS:", this.drink_id);
            this.ws.send(this.drink_id);
        };

        this.ws.onmessage = ({data}) => {
            const res = JSON.parse(data);
            console.log("Received ws message: ", res);
            if(res.status !== undefined) {
                this.last_status = res.status;

                if(this.last_status === "done") {
                    Alert.alert("Drink done", "Go get your drink !");
                }
            }
        };

        this.ws.onclose = () => {
            this.close = true;
            console.log("Close WS: ", this.errorTimeout);
            clearTimeout(this.errorTimeout);
            this.errorTimeout = null;
            this.ws = null;
        };

        this.ws.onerror = function(event) {
            if(!this.close) {
                console.log("error ws");
                this.errorTimeout = setTimeout(() => {
                    alert(event);
                }, 2000);
            }
        };

        if(this.callback !== null)
            this.callback(true);
    }

    selfDelete() {
        for(let i = 0; i < global.cocktail_requests.length; i++) {
            const cocktail_request = global.cocktail_requests[i];
            if(cocktail_request === i) {
                global.cocktail_requests.splice(i, 1);
                return;
            }
        }
    }
}