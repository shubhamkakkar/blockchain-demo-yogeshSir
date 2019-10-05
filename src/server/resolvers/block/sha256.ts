import { sha256 } from 'js-sha256';
import { Block } from "../../../generated/graphql"

// @ts-ignore
export const blockHashGenerator = ({ index, timestamp, data, prevHash, nounce }): string => sha256(
    index + timestamp + data + prevHash + nounce
)