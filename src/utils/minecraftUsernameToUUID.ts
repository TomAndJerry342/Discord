const url = 'https://api.mojang.com/users/profiles/minecraft/'
import fetch from 'node-fetch';
import Logger from './logger.js';
export default async function usernameToUUID(username:string) {
    try {
        let response  = await fetch(`${url}${username}`, {method:"GET"}) as any
        let json = await response.json()
        console.log(json)

        return json.id


    } catch (error:any) {
        Logger.error("fuck")
        throw new Error(error)
    }

}