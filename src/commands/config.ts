import keytar from 'keytar';
import chalk from 'chalk';

export async function config(cid : string, password : string) {

    if (cid.includes("@")) {
        console.log(chalk.redBright("ERROR")+
            "\nOnly username required, did you enter the email adress?");
        return;
    }

    await keytar.setPassword("chabal", cid, password)
        .then(() => {
            console.log("Updated cid and password");
        }).catch((err) => console.log(err));
}