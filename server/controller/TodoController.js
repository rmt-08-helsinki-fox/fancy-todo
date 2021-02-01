const {Todo} = require('../models')


class TodoController{

    static TodoPost(req,res){
        
        let obj = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            duedate:req.body.duedate,
            UserId :req.body.UserId
        }

        Todo.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(400).json(err)
        })

    }

    static getTodo(req,res){
         
        Todo.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static getTodoId(req,res){
         let id = req.params.id


         Todo.findByPk(id)

         .then(data=>{
            if(!data){
                res.status(404).json({msg:"kagak ada data"})
            }else{
                res.status(200).json(data)
            }
         })
         .catch(err=>{
             res.status(500).json(err)
         })


    }

    static TodoPut(req,res){
        let id = req.params.id
       
        let {title,description,status,duedate} = req.body


        Todo.update({
                title,description,status,duedate},
            {where:{id},returning:true
        })

        .then(data=>{

            if(data[0]=== 0){
                res.status(400).json({msg:"kagak ada data"})
            }else{
                res.status(200).json(data)
            }
            
           

            
        })
        .catch(err=>{
               res.status(500).json(err)
        })


    }


    static PatchTodo(req,res){
         let id = +req.params.id

         let {status} = req.body


         Todo.update({status}, {where:{id}, returning:true})

         .then(data=>{
            if(data[1]=== 0){
                res.status(404).json({msg:"data kagak ada"})
            }else{
                res.status(200).json(data)
            }
         })

         .catch(err=>{
            res.status(500).json(err)
         })
    }


    static deleteTodo(req,res){
        let id = req.params.id

        Todo.destroy({where:{id}})
        
        .then(data=>{
            if(data === 0){
                res.status(404).json({msg:"todo not found"})
            }else{
                res.status(200).json({msg:"successs delete"})
            }
         })

         .catch(err=>{
            res.status(500).json(err)
         })
    }

}


module.exports = TodoController