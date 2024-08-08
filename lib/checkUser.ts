import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db";

export const checkUser = async () => {
    const user = await currentUser();
    console.log(user);
    
    // checked if user is loggedin or not:
    if(!user) {
        return null;
    }
    const isLoggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    })

    // if user is in the db then return user
    if(isLoggedInUser){
        return isLoggedInUser;
    }
    // else create new user
    const newUser = await db.user.create({
        data: {
            clerkUserId:user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })
    return newUser
}