# fancy-todo

model:
npx sequelize model:generate --name Todo --attributes title:string,description:string,status:boolean,due_date:date

npx sequelize model:generate --name User --attributes username:string,email:string,password:string

migration tambahan:
npx sequelize migration:generate --name add-FKUSerId-to-Todo

Todo server:
1. Buat Api untuk destroy all sort by UserId yang statusnya true
2. oAuth
3. Documentation '/user'

