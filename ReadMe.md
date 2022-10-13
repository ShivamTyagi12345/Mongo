# Back end Assignment

This demonstrates all the CRUD operations and securing the endpoints using JWT and bcrypt    library

## Local Set Up

---

```markdown
git clone https://github.com/ShivamTyagi12345/Mongo.git

cd Mongo

npm install

npm run dev

```

🌀

🌀Yay! UI accecisible on [localhost](http://localhost) :5000

![Untitled](public/Untitled.png)

## API endpoints

---

Note : I am using Postman for route checking

1. ***/create : Create a new User in the Mongo Db***

⇒ Provide the body and URI

⇒ Response: 

- Hashed password using **bcrypt**
- **JWT** token

![Untitled](public/Untitled%201.png)

1. ***/read : Read all the existing users in the db***

⇒ An array of all the existing users in the db

![Untitled](public/Untitled%202.png)

⇒ the same can be seen in the UI

![Untitled](public/Untitled%203.png)

1. ***/update: Update the existing user’s Password***

⇒ Inorder to update the password, the user **must login** first . 

![Untitled](public/Untitled%204.png)

⇒ Grab the Token and Provide it as a header in the delete request

![Untitled](public/Untitled%205.png)

⇒ Now try logging In using the Old Password in the /login route , it wont allow us an entry

![Untitled](public/Untitled%206.png)

⇒ **However** , with the Updated password….Voila!

![Untitled](public/Untitled%207.png)

1. ***/ delete : Delete a User using the metadata of User Id*** 

⇒ Provide the _id parameter with the /delete route  and that deletes the user

![Untitled](public/Untitled%208.png)

⇒ Fun fact: Lets try sending this request again. 

![Untitled](public/Untitled%209.png)

This happens because we don’t have that _id in our DB anymore. 

Thanks for the read. Enjoy :)