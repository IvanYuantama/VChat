# VChat
![image](https://github.com/IvanYuantama/VChat/assets/123520791/4d784de1-7c3e-4f1f-9f9e-05f686445f18)

VChat adalah sebuah website yang digunakan untuk mengirimkan pesan dan balasan kepada teman, pasangan, ataupun keluarga. Pada website ini user perlu melakukan signup terlebih dahulu, lalu login. Jika sudah login, maka user dapat terhubung dengan orang-orang disekitar dengan memasukkan chatid yang dapat ditentukan oleh user itu sendiri.

Check out our web : https://v-chat-frontend-blue.vercel.app/


# 💻 Installation Guide

Clone this repository

```
git clone https://github.com/IvanYuantama/VChat.git
```

## Frontend

- Ensure You’re on the right folder to the /Frontend

- Run npm install to install all dependencies
  ```
   npm install
  ```
- To test the installation result run
  ```
  npm run dev
  ```
   ![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/249fa243-5523-48c6-a2bf-11ec82e59793)

## Backend

- Ensure You’re on the right folder

- Run npm install to install all dependencies
  ```
   npm install
  ```
- Create an .env file in your project root folder and add your variables.

- Insert Database Variables

- To test the installation result run
  ```
   npm run start
  ```
  
# LIST API

## Backend
USER

  - Login User =  http://localhost:8463/user/login
  - SignUp User =  http://localhost:8463/user/signup
  - getUserId by username = http://localhost:8463/user/getId/:username
  - getUser by id = http://localhost:8463/user/:id
  - UpdateProfile = http://localhost:8463/user/profile/:id

CHAT

  - getChat by id = http://localhost:8463/chat/:id
  - AddChat = http://localhost:8463/chat/add
  - EditChat = http://localhost:8463/chat/edit/:id
  - DeleteChat = http://localhost:8463/chat/delete/:id


CLOUDINARY
  - Upload to cloudinary =  http://localhost:8463/cloudinary

## Frontend
  - Dashboard =  http://localhost:5173
  - Login = http://localhost:5173/user/login
  - SignUp = http://localhost:5173/user/signup
  - DashboardChat = http://localhost:5173/chat
  - DashboardProfile = http://localhost:5173/user/profile/:id

# Tampilan Website
  - Dashboard
  ![image](https://github.com/IvanYuantama/VChat/assets/123520791/b10e3a4c-3d27-47bb-9b95-335d06b0fbdc)
  - Login
  ![image](https://github.com/IvanYuantama/VChat/assets/123520791/108b0fec-bf80-40a5-b5c8-3852f309b8c1)
  - SignUp 
  ![image](https://github.com/IvanYuantama/VChat/assets/123520791/e87fd515-f0b9-4c98-8e1a-20e84641dc4b)
  - DashboardChat
  ![image](https://github.com/IvanYuantama/VChat/assets/123520791/4d784de1-7c3e-4f1f-9f9e-05f686445f18)
  - DashboardProfile = belum dibuat


