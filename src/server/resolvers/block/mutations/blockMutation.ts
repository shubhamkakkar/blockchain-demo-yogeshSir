import {MutationCreateBlockArgs} from "../../../../generated/graphql";
import {JWTVerify} from "../../user/helperUserFunctions/jwt";
import UserSchema from "../../../models/user/user";
import BlockSchema from "../../../models/blocks/block";
import {stringEncryption} from "../../globalHelperFunctions";
import BlockClass, {passwordGen, TBlockConstructor} from "../../../../Blockchain/Block";

interface TBlockConstructorCustom extends TBlockConstructor {
    token: string;
    privatekey: string;
    publickey: string;
}


function createNewBlock({index, data: message, prevHash, token, privatekey, publickey}: TBlockConstructorCustom) {

    const encryptMessage = stringEncryption({publickey, message, privatekey});
    const toAddBlock = new BlockClass({
        index,
        data: encryptMessage,
        prevHash,
    });
    const {hash} = toAddBlock;
    const password = () => {
        const chars = passwordGen({privatekey, publickey, hash}).split("");
        const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-='.split("");
        let temp = "";

        while (temp.length < 10) {
            let index = Math.floor(Math.random() * 7) + Math.floor(Math.random() * 3);
            temp += chars[index] + punctuation[index]
        }
        return temp
    };

    const newBlock = new BlockSchema({...toAddBlock, creatorEmail: token, password: password()});
    return newBlock.save().then(res => res).catch(er => er);
}


export function blockCreationMutation({data, token, privateKey: givenPrivateKey}: MutationCreateBlockArgs) {
    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                // @ts-ignore
                const {privateKey: userOriginalPrivateKey, publicKey}: { privateKey: string, publicKey: string } = user;
                if (givenPrivateKey === userOriginalPrivateKey) {
                    return BlockSchema.find()
                        .then(chain => {
                            if (!chain.length) {
                                //  genesis block
                                const index = 0;
                                const prevHash = '0';
                                return createNewBlock({
                                    index,
                                    data,
                                    prevHash,
                                    token,
                                    privatekey: givenPrivateKey,
                                    publickey: publicKey
                                })
                            } else {
                                // @ts-ignore
                                const {index: lastIndex, hash: prevHash}: { index: number, hash: string } = chain.reverse()[0]._doc;
                                const index = lastIndex + 1;
                                return createNewBlock({
                                    index,
                                    data,
                                    prevHash,
                                    token,
                                    privatekey: givenPrivateKey,
                                    publickey: publicKey
                                })
                            }
                        })
                        .catch(er => console.log("er", er))
                }
            } else {
                console.log("not found - user in block mutation")
            }
        })
        .catch(er => console.log("er at finding user by email", er))
}
