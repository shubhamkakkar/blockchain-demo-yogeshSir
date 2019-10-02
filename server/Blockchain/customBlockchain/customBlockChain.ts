const inquirer = require("inquirer");
import createBlockchain from './createBlockchain';



function customBlockChain() {
    const questions = [{
        type: 'input',
        name: 'lengthToCreate',
        message: "What should be the length of blockchain you want to create?",
    }];

    let blockchainData: { data: string }[] = [];
    inquirer.prompt(questions).then((answers: any) => {
        const lengthToCreate: number = parseInt(answers['lengthToCreate']);
        if (lengthToCreate) {

            let blockchainDataQuestions: any[] = [];
            for (let i = 0; i < lengthToCreate; i++) {
                blockchainDataQuestions = [
                    ...blockchainDataQuestions,
                    {
                        type: 'input',
                        name: `data_stored_${i}`,
                        message: `Data to be stored in block ${i + 1}?`,
                    }
                ]
            }
            inquirer.prompt(blockchainDataQuestions).then((qa: any) => {
                Object.keys(qa).map(keyI => {
                    blockchainData = [
                        ...blockchainData,
                        {
                            data: qa[keyI]
                        }
                    ];
                });
                createBlockchain(lengthToCreate, blockchainData);
            });
        } else {
            console.log("The blockchain must have a length of at least 1");
            return 0;
        }
    });

}

export default customBlockChain
