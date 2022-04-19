import keytar from 'keytar';
import chalk from 'chalk';
import axios from 'axios';

interface ChabalResponse {
    user : Record<string, unknown> // Don't care
    information : ChabalInformation
}

interface ChabalInformation {
    balance : number
    cardNumber : string
}

export async function balance() {

    let conf = await keytar.findCredentials("chabal");    
    if (conf.length == 0) {
        console.log("No credentials found in keychain.\n Run 'chabal config <username> <password>'");
        return;
    } 
    
    let credentials = conf[0];
    let username = credentials.account + "@student.chalmers.se";

    const creds = {"Username" : username, "Password" : credentials.password};
    const chabalResponse = await axios.post('https://portal.microdeb.se:44396/api/v1/login/194699f3-1f9e-47a4-8052-df26df0bc114/mps', creds)
        .then(res => res.data) as ChabalResponse;

    let chabalInformation : ChabalInformation = chabalResponse.information;
    let tmp : string = chabalInformation.balance.toString();

    let balance = tmp.substring(0, tmp.length - 2) + "." + tmp.substring(tmp.length - 2) + "kr";
    console.log("You have " + chalk.greenBright(balance) + " in your student union card.");
}
