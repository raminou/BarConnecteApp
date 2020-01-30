import { Alert } from 'react-native';
import { API_URL, WS_URL } from 'react-native-dotenv';

export default class CocktailRequest {
    constructor(drink) {
        this.drink = drink; // Object {ingredients: [{name, value}]
        this.drink_id = "";
        this.ws = null;

        this.requestHTTP();
    }

    requestHTTP() {
        fetch(API_URL + "/drink", {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.drink)
        })
        .then((res) => res.json())
        .then((res) => {
            Alert.alert("Success !", "Your order is registered");
            console.log(res)
            this.drink_id = res.data.id;
            this.requestWS();
        })
        .catch((error) => {
            Alert.alert('Error requesting', error, [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => this._orderDrink()}
            ]);
        });
    }

    requestWS() {
        console.log(`Try websockets: ${WS_URL}`);
        this.ws = new WebSocket(WS_URL);
        this.ws.onopen = () => {
            console.log("Open WS:", this.drink_id);
            this.ws.send(this.drink_id);
        };
        this.ws.onmessage = ({data}) => {
            console.log("Received message: ", data);
            alert(JSON.parse(data));
        };

        this.ws.onclose = () => {
            console.log("Close WS");
            this.selfDelete();
        };

        this.ws.onerror = function(event) {
            console.error("WebSocket error observed:", event);
        };
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