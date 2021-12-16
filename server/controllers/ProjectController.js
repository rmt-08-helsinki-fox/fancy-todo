const { Project, User, ProjectUser } = require('../models');
const { Sequelize } = require("sequelize");

class ProjectController{

    static index = async(req,res,next) => {
        try {
            let projects = await Project.findAll({
                where : 
                    Sequelize.or(
                        { '$ProjectUsers.UserId$' : +req.user.id },
                        { 'UserId' : +req.user.id}
                    )  
                ,
                include : [
                    'Users',
                    'ProjectUsers'
                ],
                
            });
            res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    }
    static create = async(req,res,next) => {
        let { name } = req.body
        try {
            let project = await Project.create({ name, UserId : +req.user.id });
            res.status(201).json(project);
        } catch (error) {
            next(error);
        }
    }
    static update = async(req,res,next) => {
        try {
            
        } catch (error) {
            
        }
    }
    static detail = async(req,res,next) => {
        try {
            
        } catch (error) {
            
        }
    }
    static destroy = async(req,res,next) => {
        try {
            
        } catch (error) {
            
        }
    }
    static invite =async(req,res,next) => {
        let { email } = req.body
        let project_id = +req.params.id;
        try {
            let userInvited = await User.findOne({ where : { email } });
            if(!userInvited){
                throw { msg : 'User not found' , statusCode : 400,  name : 'custom' }
            }
            let checkProjectUser = await ProjectUser.findOne({ where : { UserId : userInvited.id, ProjectId : project_id } });
            if(checkProjectUser){
                throw { msg : 'User already invited' , statusCode : 400 , name : 'custom' }
            }
            await ProjectUser.create({ UserId : userInvited.id, ProjectId : project_id });
            res.status(201).json({msg : 'User invited successfully'});
        } catch (error) {
            next(error);
        }  
    }

    static readTodo = async(req,res,next) =>{
        console.log(req.user.id)
        return;
        try {
            let projects = await Project.findAll({
                where : 
                    Sequelize.or(
                        { '$ProjectUsers.UserId$' : +req.user.id },
                        { 'UserId' : +req.user.id}
                    )  
                ,
                include : [
                    'Todos'
                ],
                
            });
            res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = ProjectController