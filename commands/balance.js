import fetch from 'node-fetch';
import keytar from 'keytar';
import chalk from 'chalk';

export async function balance() {

    let conf = await keytar.findCredentials("chabal");    
    if (conf.length == 0) {
        console.log("No credentials found in keychain.\n Run 'chabal config <username> <password>'");
        return;
    } 
    
    let credentials = conf[0];
    let username = credentials.account + "@student.chalmers.se";

    const creds = {"Username" : username, "Password" : credentials.password};
    fetch('https://portal.microdeb.se:44396/api/v1/login/194699f3-1f9e-47a4-8052-df26df0bc114/mps', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => {
        let tmp = JSON.stringify(data.information.balance);
        let balance = tmp.substring(0, tmp.length - 2) + "." + tmp.substring(tmp.length - 2) + "kr";
        console.log("You have " + chalk.greenBright(balance) + " in your student union card.");
    }).catch(err => console.log(err));
}
